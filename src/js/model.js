import 'regenerator-runtime/runtime';
import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: '',
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
    };
   
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {

    state.search.query = query

    const data = await getJSON(`${API_URL}?search='${query}'`);

    state.search.results = data.data.recipes.map(rec => {

      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };

    });

  } catch (err) {

    console.log(err);

    throw err;
  }
};

