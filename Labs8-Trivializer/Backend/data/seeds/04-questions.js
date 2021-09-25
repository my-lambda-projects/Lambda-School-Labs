exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("Questions")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("Questions").insert([
                {
                    id: 1,
                    rounds_id: 1,
                    category: "Geography",
                    type: "boolean",
                    difficulty: "medium",
                    question: "Seoul is the capital of North Korea.",
                    correct_answer: "False",
                    incorrect_answers: ["True"]
                },
                {
                    id: 2,
                    rounds_id: 1,
                    category: "Entertainment: Music",
                    type: "multiple",
                    difficulty: "medium",
                    question:
                        "Which of these languages was NOT included in the 2016 song &quot;Don&#039;t Mind&quot; by Kent Jones?",
                    correct_answer: "Portuguese",
                    incorrect_answers: ["Japanese", "French", "Spanish"]
                },
                {
                    id: 3,
                    rounds_id: 1,
                    category: "Science & Nature",
                    type: "multiple",
                    difficulty: "easy",
                    question: "How many bones are in the human body?",
                    correct_answer: "206",
                    incorrect_answers: ["203", "209", "200"]
                },
                {
                    id: 4,
                    rounds_id: 1,
                    category: "Celebrities",
                    type: "multiple",
                    difficulty: "medium",
                    question: "When was Elvis Presley born?",
                    correct_answer: "January 8, 1935",
                    incorrect_answers: [
                        "December 13, 1931",
                        "July 18, 1940",
                        "April 17, 1938"
                    ]
                },
                {
                    id: 5,
                    rounds_id: 1,
                    category: "Entertainment: Video Games",
                    type: "boolean",
                    difficulty: "hard",
                    question:
                        "TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
                    correct_answer: "False",
                    incorrect_answers: ["True"]
                },
                {
                    id: 6,
                    rounds_id: 1,
                    category: "Mythology",
                    type: "boolean",
                    difficulty: "medium",
                    question:
                        "In Greek mythology, Hera is the goddess of harvest.",
                    correct_answer: "False",
                    incorrect_answers: ["True"]
                },
                {
                    id: 7,
                    rounds_id: 1,
                    category: "Mythology",
                    type: "multiple",
                    difficulty: "medium",
                    question:
                        "What is the name of the Greek god of blacksmiths?",
                    correct_answer: "Hephaestus",
                    incorrect_answers: ["Dyntos", "Vulcan", "Artagatus"]
                },
                {
                    id: 8,
                    rounds_id: 1,
                    category: "Entertainment: Cartoon & Animations",
                    type: "boolean",
                    difficulty: "medium",
                    question:
                        "Nickelodeon rejected the pilot to Adventure Time.",
                    correct_answer: "True",
                    incorrect_answers: ["False"]
                },
                {
                    id: 9,
                    rounds_id: 1,
                    category: "Entertainment: Video Games",
                    type: "multiple",
                    difficulty: "medium",
                    question:
                        "What is the name of the first level in &quot;Call of Duty: World at War&quot;?",
                    correct_answer: "Semper Fi",
                    incorrect_answers: ["Ring of Steel", "Vendetta", "Eviction"]
                },
                {
                    id: 10,
                    rounds_id: 1,
                    category: "Entertainment: Video Games",
                    type: "multiple",
                    difficulty: "medium",
                    question:
                        "In the &quot;Call Of Duty: Zombies&quot; map &quot;Der Riese&quot;, what is the name of the &quot;Pack-A-Punched PPSH-41&quot;?",
                    correct_answer: "The Reaper",
                    incorrect_answers: [
                        "Lamentation",
                        "The Grim Reaper",
                        "The Eviscerator  "
                    ]
                }
            ]);
        });
};
