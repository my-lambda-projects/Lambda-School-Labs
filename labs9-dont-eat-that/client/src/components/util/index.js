export const searchFunc = (query, recipes) => {
  // checkIngredient function checks if a recipe's ingredient names has search query
  // and returns true or false

  const checkIngredient = recipe => {
    const result = recipe.ingredients.filter(ingredient => {
      //   let ingredientName = ingredient.name.toUpperCase();
      return ingredient.name.toUpperCase().includes(query.toUpperCase());
    });

    // filter returns array and even empty array is truthy.
    // so check the length and return true or false

    return result.length > 0 ? true : false;
  };
  // returns recipes that has search query in recipe name or ingredient name
  // console.log('Search index.js recipes = ', recipes);
  return recipes.filter(recipe => {
    // let recipeName = recipe.name.toUpperCase();

    return (
      recipe.name.toUpperCase().includes(query.toUpperCase()) ||
      checkIngredient(recipe)
    );
  });
};

// below function return a content for one recipe for download Excel file
function getARecipeContent(keys, recipe) {
  let ctr = 0;

  let recipeContent = '';
  const columnDelimiter = ',';

  keys.forEach(function(key) {
    let temp = '';
    if (ctr > 0) recipeContent += columnDelimiter;
    if (key === 'ingredients') {
      recipe.ingredients.forEach(ingredient => {
        let ingName = ingredient.name.toString().replace(/[,\n]/g, '');
        recipeContent +=
          ingName +
          ' ' +
          ingredient.quantity +
          ' ' +
          ingredient.unit +
          columnDelimiter;
      });
    } else {
      temp += recipe[key] ? recipe[key].toString() : '';
      temp = temp.replace(/[,\n]/g, '');
      temp = temp.replace(/<[^>]*>/g, ' ');
      recipeContent += temp;
    }
    ctr++;
  });
  console.log(recipeContent);
  return recipeContent;
}

// below function download an excel file with recipe contents
// Argument can be 1 recipe object or array of recipe objects.

export const downloadRecipeToCSV = recipes => {
  let filename, link, csv, keys, columnDelimiter, lineDelimiter;
  columnDelimiter = ',';
  lineDelimiter = '\n';
  filename = 'recipe.csv';
  let temp = '';
  // keys = Object.keys(recipe);
  keys = ['id', 'name', 'description', 'ingredients'];

  console.log('Download Util  recipe = ', recipes);
  console.log('Keys = ', keys);

  csv = '';
  csv += keys.join(columnDelimiter);
  csv += lineDelimiter;

  if (recipes.length > 0) {
    recipes.forEach(function(recipe) {
      temp += getARecipeContent(keys, recipe) + lineDelimiter;
    });
  } else temp = getARecipeContent(keys, recipes);

  csv += temp;

  // });
  csv += lineDelimiter;
  // });

  if (csv == null) return;

  csv = 'data:text/csv;charset=utf-8,' + csv;

  link = document.createElement('a');
  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
};
