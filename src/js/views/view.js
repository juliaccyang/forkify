import icons from 'url:../../img/icons.svg'; //parcel2 add url: to import static assets

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    /* remove due to the non-sense no query error message when reload the page
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); 
    */
    //compare the newMarkup w/ the old one and only replace the different part
    this._data = data;
    const newMarkup = this._generateMarkup();
    //convert the newMarkup to DOM object then compare with the previous DOM object easily
    //this new DOM object lives in memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //Array.from: convert to array
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //change textContent
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        //update change attribute for change the data-update-to attr
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    //publisher-subscriber pattern
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
