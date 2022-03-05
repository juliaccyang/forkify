import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //parcel2 add url: to import static assets

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet. Find a nice recipe and bookmark it:)';
  _message = '';

  //to render the existing bookmark before the update bookmark function when the page reload
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
