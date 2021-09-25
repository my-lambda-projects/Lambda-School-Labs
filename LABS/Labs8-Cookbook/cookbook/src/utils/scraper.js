import axios from "axios";

const og_scraper = el => {
  let og_title = el.querySelector(`meta[property="og:title" ]`);
  // og_title.replace("Recipe", "").replace(" - Genius Kitchen", "");
  const og_image = el.querySelector(`meta[property="og:image" ]`);
  const og_desc = el.querySelector(`meta[name="description" ]`);
  return {
    og_title: og_title
      ? og_title.content.slice(0, og_title.content.indexOf("Recipe"))
      : null,
    og_image: og_image ? og_image.content : null,
    og_desc: og_desc ? og_desc.content : null
  };
};

const scraper = async url => {
  try {
    const response = await axios.get(
      "https://api.allorigins.ml/get?url=" + encodeURIComponent(url)
    );
    const html = response.data.contents;
    const parser = new DOMParser();
    const el = parser.parseFromString(html, "text/html");
    const { og_title, og_image, og_desc } = og_scraper(el);
    const og_sitename = new URL(url).hostname;
    const og_url_el = el.querySelector(`meta[property="og:url" ]`);
    const og_url = og_url_el ? og_url_el.content : url;

    let prep_time = "N/A";
    let servings = "N/A";
    let ingredient_list = [];
    let instructions = [];

    //First whitelisted website geniuskitchen.com
    if (url.toLowerCase().includes("geniuskitchen")) {
      const prep_time_el = el.querySelector(`td.time`);
      const servings_el = el.querySelector(`span.count`);
      const ingredients_el = el.querySelectorAll("li[data-ingredient]");
      const instructions_el = el.querySelectorAll(`div.directions ol li`);

      prep_time = prep_time_el
        ? prep_time_el.textContent
            .replace(/[\n\r]+|[\s]{2,}/g, " ")
            .trim()
            .match(/\d+.+/g)[0]
        : "N/A";
      servings = servings_el ? servings_el.textContent : "N/A";

      if (ingredients_el.length) {
        ingredients_el.forEach(i => {
          const quantity = i.children[0].textContent
            .trim()
            .replace(String.fromCharCode(8260), "/");
          let total_quantity = quantity ? quantity : "0";
          if (total_quantity.includes("-")) {
            total_quantity = total_quantity.split("-")[1].trim();
          }
          ingredient_list.push({
            quantity: total_quantity,
            name: i.children[1].textContent.trim()
          });
        });
      }

      if (instructions_el.length) {
        instructions_el.forEach(i => {
          if (!i.firstElementChild) {
            instructions.push(i.textContent);
          }
        });
      }
    }

    //First whitelisted website allrecipes.com
    if (url.toLowerCase().includes("allrecipes")) {
      const prep_time_el = el.querySelector(`span[class="ready-in-time"]`);
      const servings_el = el.querySelector(`#metaRecipeServings`);
      const ingredients_el = el.querySelectorAll(
        "span.recipe-ingred_txt.added:not(.white)"
      );
      const instructions_el = el.querySelectorAll(
        "span[class='recipe-directions__list--item'"
      );

      prep_time = prep_time_el ? prep_time_el.textContent : "N/A";
      servings = servings_el ? servings_el.content : "N/A";

      if (ingredients_el.length) {
        ingredients_el.forEach(i => {
          if (i.textContent) {
            const find_quantity = i.textContent
              .trim()
              .match(/\d+(\/\d+)?(\s\d+\/\d+)?/);
            const quantity = find_quantity ? find_quantity[0].trim() : null;
            const name = i.textContent.replace(quantity, "").trim();
            let total_quantity = quantity ? quantity : "0";
            if (total_quantity.includes("-")) {
              total_quantity = total_quantity.split("-")[1].trim();
            }
            ingredient_list.push({
              quantity: total_quantity, //convert_quantity(total_quantity),
              name
            });
          }
        });
      }

      if (instructions_el.length) {
        instructions_el.forEach(i => {
          if (i.textContent) {
            instructions.push(i.textContent.trim());
          }
        });
      }
    }

    return {
      og_sitename,
      og_title,
      og_image,
      og_desc,
      og_url,
      prep_time,
      servings,
      ingredient_list,
      instructions
    };
  } catch (error) {
    return { error: error.message };
  }
};

export default scraper;
