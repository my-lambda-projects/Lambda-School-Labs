const server = require("express")(); // sets up an express instance and returns a callback function
const db = require("../../data/db");
const utilities = require("../util/utilities");

var simplecrypt = require("simplecrypt");

var sc = simplecrypt({ password: process.env.SECRET });

const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.DOMAIN_NAME;
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

// Base endpoint (at users/)
server.get("/", (req, res) => {
  res.json("App is currently functioning");
});

// Add new user
server.post("/register", async (req, res) => {
  // This table also includes credit card info, will handle in billing
  const { username, password, name, email, phone, logo } = req.body;

  // Encrypt password and add to package to be stored in Users table
  const hash = sc.encrypt(password);
  const credentials = {
    username: username,
    password: hash,
    email: email,
    name: name,
    phone: phone,
    logo: logo,
    paid: 0
  };

  try {
    // Try to insert the user
    let userId = await db("Users").insert(credentials);
    let user = await db("Users")
      .where({ username })
      .first();

    if (!userId) throw new Error("Unable to add that user");

    //mailgun api request
    const data = {
      from: "<trivializer@trivializer.com>",
      to: credentials.email,
      subject: "Welcome",
      text: "Welcome to Bar Trivia. Thank you for registering!"
    };
    mailgun.messages().send(data, function(error, body) {});

    // Generate a new token and return it
    let token = utilities.generateToken(username);
    res
      .status(201)
      .json({ token: token, userId: user.id, status: credentials.paid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login a user takes in username and password. Validates credentials
server.post("/login", utilities.getUser, async (req, res) => {
  let { username, password } = req.body;

  try {
    // Hit users table searching for username
    let user = await db("Users")
      .where({ username })
      .first();

    if (!user) throw new Error("Incorrect credentials");
    // decrypt the returned, hashed password
    decryptedPassword = sc.decrypt(user.password);

    // Check that passwords match
    if (decryptedPassword === password) {
      // Generate a new token and return it
      let token = utilities.generateToken(username);
      res
        .status(201)
        .json({ token: token, userId: user.id, status: user.paid });
    } else {
      res.status(401).json({ message: "Incorrect Credentials" });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// Creates a new game, takes in username, created, gameName and description (string)
server.post("/creategame", utilities.protected, async (req, res) => {
  try {
    const { username, created, gameName, description, played } = req.body;

    // Returns an array with a single user object, we just want the id here
    let user = await db("Users")
      .where({ username })
      .first();

    if (!user) throw new Error("No user by that name");
    // Get the id from the returned user object
    let userId = user.id;

    // Create package with all necessary fields for the Games table
    let gamePackage = {
      name: gameName,
      date_created: created,
      date_played: played === 0 ? 0 : played,
      user_id: userId,
      description: description
    };

    // inserting into games returns an array with 1 game ID if successful
    let gameId = await db("Games").insert(gamePackage);

    if (!gameId) throw new Error({ message: "Error inserting game" });

    let game = await db("Games")
      .where({ name: gameName })
      .first();

    if (!game) throw new Error({ message: "Game not saved in DB" });

    res.status(201).json(game);
  } catch (err) {
    console.log("error in createGame!!!", err.message);
    res.status(404).json({ message: err.message });
  }
});

// Updates a game, takes in username, created, played, gameName and description (string)
server.put("/editgame/:id", utilities.protected, async (req, res) => {
  try {
    const { id } = req.params;
    const edit = { ...req.body };

    // update game by id
    let game = await db("Games")
      .where("id", id)
      .update({
        name: edit.gameName,
        description: edit.description,
        date_played: edit.datePlayed
      });

    // get game by id
    let newGame = await db("Games").where("id", id);

    res.status(200).json({
      gameId: newGame[0]["id"],
      gamename: newGame[0]["name"],
      description: newGame[0]["description"],
      dateCreated: newGame[0]["date_created"],
      datePlayed: newGame[0]["date_played"]
    });
  } catch (err) {
    console.log("err.message: ", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get all games for a username passed in. Nedds a username passed in req.body
server.post(
  "/games",
  utilities.getUser,
  utilities.protected,
  async (req, res) => {
    try {
      const id = req.userIn.id; // This is set in utilities.getUser

      let games = await db
        .select(
          "g.id as gameId",
          "g.name as gamename",
          "g.description as description",
          "g.date_created as dateCreated",
          "g.date_played as datePlayed"
        )
        .from("Users as u")
        .leftJoin("Games as g", "g.user_id", "u.id")
        .where("u.id", "=", id);
      res.status(200).json(games);
    } catch (err) {
      console.log("Error getting games: ", err.message);
      res.status(500).json({ message: "Problem getting games" });
    }
  }
);

// Get all rounds for a game id passed in
server.get("/rounds/:id", utilities.protected, async (req, res) => {
  try {
    // Game Id passed in request URL
    const { id } = req.params;

    // Gets all rounds from the Rounds table where the game id matches the passed in ID
    let rounds = await db
      // Choose which columns we want to select, and assign an alias
      .select(
        "r.id as roundId",
        "r.name as roundName",
        "r.number_of_questions as numQs",
        "r.category as category",
        "r.difficulty as difficulty",
        "r.type as type"
      )
      .from("Games as g")
      .leftJoin("Rounds as r", "r.game_id", "g.id")
      .where("g.id", "=", id);

    res.status(200).json(rounds);
  } catch (err) {
    console.log("err.message get rounds: ", newGame);
    res.status(500).json({ message: "Problem getting rounds" });
  }
});

// Delete a round based on round id
server.delete("/round/:id", utilities.protected, async (req, res) => {
  const { id } = req.params;
  try {
    // Returns the id of the deleted round
    let response = await db("Rounds")
      .where({ id })
      .del();

    // If response === 0 no round was deleted
    if (response === 0) throw new Error(`Error deleting round ${id}`);

    // delete all questions based on that round
    let responseQuestions = await db("Questions")
      .where({ rounds_id: id })
      .del();

    res.status(200).json(`Round ${response} deleted`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a game based on game id
server.delete("/game/:id", utilities.protected, async (req, res) => {
  const { id } = req.params;
  try {
    // Returns the id of the deleted game
    let response = await db("Games")
      .where({ id })
      .del();

    // If response === 0 no game was deleted
    if (response === 0) throw new Error(`Error deleting game ${id}`);

    res.status(200).json(`Game ${response} deleted`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Save a round
server.post("/round", utilities.protected, async (req, res) => {
  try {
    // Get all pertinent info from req.body
    const {
      gameId,
      roundName,
      category,
      difficulty,
      type,
      questions
    } = req.body;

    // Returns empty array if no game
    let validGame = await db("Games").where({ id: gameId });

    // Check to see if valid gameId
    if (validGame.length < 1) throw new Error("no Game by that ID");

    // Assemble round info to be entered in DB
    let roundPackage = {
      game_id: gameId,
      name: roundName,
      category: category,
      type: type,
      difficulty: difficulty,
      number_of_questions: questions
    };

    // Use postgres's .returning to get the ID of the
    // recently entered round
    let roundId = (await db("Rounds")
      .insert(roundPackage)
      .returning("id"))[0];

    if (!roundId) throw new Error({ message: "Error inserting Round" });

    let returnPackage = {
      roundId: roundId,
      roundName: roundName,
      numQs: questions,
      category: category,
      difficulty: difficulty,
      type: type
    };

    res.status(200).json(returnPackage);
  } catch (err) {
    console.log("err.message in POST /round: ", err.message);
    res.status(400).json({ message: err.message });
  }
});

// Update a round by round id
server.put("/round/:id", utilities.protected, async (req, res) => {
  try {
    const { id } = req.params;
    const edit = { ...req.body };

    // update round by id
    let round = await db("Rounds")
      .where("id", id)
      .update({
        game_id: edit.gameId,
        name: edit.roundName,
        category: edit.category,
        type: edit.type,
        difficulty: edit.difficulty,
        number_of_questions: edit.questions
      });

    if (!round) {
      throw new Error("No Round with that ID");
    }

    // get round by id
    let newRound = await db("Rounds").where("id", id);

    res.status(200).json({
      roundId: newRound[0]["id"],
      roundName: newRound[0]["name"],
      numberOfQs: newRound[0]["number_of_questions"],
      category: newRound[0]["category"],
      difficulty: newRound[0]["difficulty"],
      type: newRound[0]["type"]
    });
  } catch (err) {
    console.log("err.message: ", err.message);
    res.status(500).json({ message: err.message });
  }
});

// edit a question by question ID
server.put("/editq/:id", utilities.protected, async (req, res) => {
  try {
    const { id } = req.params;
    const edit = { ...req.body };

    // update question by id
    let question = await db("Questions")
      .where("id", id)
      .update({
        category: edit.category,
        difficulty: edit.difficulty,
        type: edit.type,
        question: edit.question,
        correct_answer: edit.correctAnswer,
        incorrect_answers: edit.incorrectAnswers,
        answers: edit.answers
      });
    // get question by id
    let newQs = await db("Questions").where("id", id);

    res.status(200).json({
      questionId: newQs[0]["id"],
      category: newQs[0]["category"],
      difficulty: newQs[0]["difficulty"],
      type: newQs[0]["type"],
      question: newQs[0]["question"],
      correctAnswer: newQs[0]["correct_answer"],
      incorrectAnswers: newQs[0]["incorrect_answers"]
    });
  } catch (err) {
    console.log("err.message: ", err.message);
    res.status(500).json({ message: err.message });
  }
});

// edit a user by userID
server.put("/edituser/:id", utilities.protected, async (req, res) => {
  try {
    const { id } = req.params;
    const edit = { ...req.body };

    // Test if parameter passed in, but with no value
    // Remove to avoid setting value in database to ""
    for (const key in edit) {
      if (edit[key] === "") {
        delete edit[key];
      }
    }

    if (edit["password"]) {
      const hash = sc.encrypt(edit["password"]);
      edit["password"] = hash;
    }

    // update user by id
    let question = await db("Users")
      .where("id", id)
      .update({
        password: edit.password,
        name: edit.name,
        email: edit.email,
        phone: edit.phone,
        logo: edit.logo,
        paid: edit.paid,
        username: edit.userName
      });

    // get user by id
    let newUser = await db("Users").where("id", id);

    res.status(200).json({
      userId: newUser[0]["id"],
      password: newUser[0]["password"],
      userName: newUser[0]["username"],
      name: newUser[0]["name"],
      email: newUser[0]["email"],
      phone: newUser[0]["phone"],
      logo: newUser[0]["logo"],
      paid: newUser[0]["paid"]
    });
  } catch (err) {
    console.log("err.message: ", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get all questions for a round id passed in
server.get("/questions/:id", utilities.protected, async (req, res) => {
  try {
    // Game Id passed in request URL
    const { id } = req.params;

    // Gets all rounds from the Rounds table where the game id matches the passed in ID
    let questions = await db
      // Choose which columns we want to select, and assign an alias
      .select(
        "q.id as questionId",
        "q.rounds_id as roundId",
        "q.category as category",
        "q.difficulty as difficulty",
        "q.type as type",
        "q.question as question",
        "q.correct_answer as correct_answer",
        "q.answers as answers",
        "incorrect_answers as incorrect_answers"
      )
      .from("Rounds as r")
      .leftJoin("Questions as q", "q.rounds_id", "r.id")
      .where("q.rounds_id", "=", id);

    if (questions) {
      questions = questions.map(question => {
        question.incorrect_answers = question.incorrect_answers.split("--");
        question.answers = question.answers.split("--");
        return question;
      });
    }
    res.status(200).json(questions);
  } catch (err) {
    console.log("err.message: ", err.message);
    res.status(500).json({ message: "Problem getting questions" });
  }
});
// Get User user info by user id
server.get("/users/:id", utilities.protected, async (req, res) => {
  try {
    // User Id passed in request URL
    const { id } = req.params;

    // Gets all info from the Users table where the user id matches the passed in ID
    let users = await db
      // Choose which columns we want to select, and assign an alias
      .select(
        "u.id as userId",
        "u.username as userName",
        "u.password as password",
        "u.name as name",
        "u.email as email",
        "u.phone as phone",
        "u.logo as logo",
        "u.credit_card as creditCard",
        "u.paid as paid"
      )
      .from("Users as u")
      .where("u.id", "=", id);

    res.status(200).json(users);
  } catch (err) {
    console.log("err.message: ", err.message);
    res.status(500).json({ message: "Problem getting user" });
  }
});

// Save all questions for a round ID
server.post("/questions", utilities.protected, async (req, res) => {
  try {
    // Check for valid Round Id
    let validRound = await db("Rounds").where({ id: req.body[0].rounds_id });

    if (validRound.length < 1) {
      throw new Error({ message: "Not a valid round ID" });
    }

    let successfulInsert = await db("Questions").insert(req.body);

    res.status(200).json({ successfulInsert });
  } catch (err) {
    console.log("err.message", err.message);
    res.status(500).json(err);
  }
});

// Delete all questions for a round based on round ID
server.delete("/questions/:id", utilities.protected, async (req, res) => {
  const { id } = req.params;

  try {
    // Delete all rounds
    let responseQuestions = await db("Questions")
      .where({ rounds_id: id })
      .del();

    res.status(200).json(`Questions deleted`);
  } catch (err) {
    console.log("err.message: ", err.message);
    res.status(400).json({ message: err.message });
  }
});

server.delete("/game/:id", utilities.protected, async (req, res) => {
  const { id } = req.params;
  try {
    // Returns the id of the deleted game
    let response = await db("Games")
      .where({ id })
      .del();

    // If response === 0 no game was deleted
    if (response === 0) throw new Error(`Error deleting game ${id}`);

    res.status(200).json(`Game ${response} deleted`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Questions table
server.get("/questions", utilities.protected, (req, res) => {
  db("Questions")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = server;
