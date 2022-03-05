//goal: 1) get query term, 2) listen to search button
class SearchView {
  _parentElement = document.querySelector('.search');
  //called by controller
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerRender(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      //to prevent the page reload
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
