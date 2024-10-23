import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

///////////////////////////////////////

// Hot reload using parcel
// if (module.hot) {
//   module.hot.accept();
// }

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
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Render initial  pagination button 
    paginationView.render(model.state.search)

  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage){
  // Render results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render initial  pagination button 
  paginationView.render(model.state.search)
}

const controlServings = function (){
  // Update the recipe servings in state
  model.updateServings(8)
  
  // Update the recipe view
  recipeView.render(model.state.recipe);
}


const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  
};
init();
