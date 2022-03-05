import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
//fixed the refer
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//from parcel
/* if (module.hot) {
  module.hot.accept();
}
 */
///////////////////////////////////////

const controlRecipe = async function () {
  try {
    //window.location = URL
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //0) update results views to mark selected search results
    resultsView.update(model.getSearchResultPage());
    //0) update bookmark
    bookmarksView.update(model.state.bookmarks);
    //1) loading recipe
    await model.loadRecipe(id);
    //2)rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2)load search results
    await model.loadSearchResults(query);
    //3)rendering search results
    //console.log(model.state.search.results);
    //render the result by page
    resultsView.render(model.getSearchResultPage());
    //4)render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1)rendering NEW results
  resultsView.render(model.getSearchResultPage(goToPage));
  //4)render NEW pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe serving
  model.updateServings(newServings);
  //update the recipe view (the function is in View class,
  //bc the functionality is need in different views)
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2)update recipe view
  recipeView.update(model.state.recipe);
  //3)render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //0)show loading spinner
    addRecipeView.renderSpinner();
    //1)upload the new recipe data
    await model.uploadRecipe(newRecipe);
    //2)render the recipe
    recipeView.render(model.state.recipe);
    //3)display success message
    addRecipeView.renderMessage();
    //4)render the bookmark view (not using update bc we want to insert new element)
    bookmarksView.render(model.state.bookmarks);
    //5) change ID in URL (3 argus: 1) state, title, URL)
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //window.history.back(), setting the action that
    //when user click the back button on the browser
    //6)close form window
    addRecipeView.closeAndResetWindow();
    //7)reset the form
  } catch (err) {
    //console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  //publisher-subscriber pattern
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
