
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import searchView from './views/searchView.js';

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    console.log(err);
    recipeView.renderError()
  }
};

const controlSearchResult = async function() {
  try { 

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query)
    console.log(model.state.search.results);

  } catch (err) {
    console.log(err);
  }
}


const init = function () {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResult)
}
init()