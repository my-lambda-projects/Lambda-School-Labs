const db = require("../../dbConfig.js");

module.exports = {
  findAllInstructions,
  findByRecipe,
  addInstruction,
  handleArrayInstructions
};

function findAllInstructions() {
  return db("instructions");
}

function findByRecipe(recipe_id) {
  return db("instructions").where({ recipe_id: recipe_id }).select("id", "order", "text", "duration");
}

async function addInstruction(recipe_id, order, text, duration) {
  const instruction = {recipe_id, order, text, duration}
  console.log("in ADD 4", instruction )
  const [id] = await db("instructions").insert(instruction);
  return id;
}

async function updateInstruction(id, changes) {
  const result = await db("instructions")
    .where({ id })
    .update(changes);
  return result;
}

async function deleteInstruction(id) {
  return db("instructions")
    .where({ id })
    .del();
}

async function handleArrayInstructions(operation, recipe_id, instructionsArray) {
  const results = [];
  for (let i = 0; i < instructionsArray.length; i++) {
    let instruction = instructionsArray[i];
    console.log("handleArray instructions 3", instruction)
    switch (operation) {
      case "add":
        const addResult = await addInstruction(recipe_id, instruction.order, instruction.text, instruction.duration);
        // console.log("addResult", addResult)
        results.push(addResult);
        break;
      case "update":
        let id = instruction.id
        delete instruction.id
        const updateResult = await updateInstruction(id, instruction);
        results.push(updateResult);
        break;
      case "delete":
        const deleteResult = await deleteInstruction(instruction);
        results.push(deleteResult);
        break;
    }
  }
  // console.log("handle instructions results", results)
  return results;
}
