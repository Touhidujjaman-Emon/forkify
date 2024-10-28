import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: '',
    resultsPerPage: RES_PER_PAGE,
    page : 1
  },
  bookmarks: [],
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
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search='${query}'`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search.page = 1;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings
    // newQt = oldQt * newServings / oldServings
  });

  state.recipe.servings = newServings
}

export const addBookmark = function (recipe) {
  // Add  bookmark
  state.bookmarks.push(recipe)

  // Mark current recipe as bookmark
  if (recipe.id = state.recipe.id) state.recipe.bookmarked = true;

}