import View from './view.js';
import icons from 'url:../../img/icons.svg'; //parcel2 add url: to import static assets

export class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      //console.log(btn);
      const goToPage = +btn.dataset.goto;
      //console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //console.log(numPages);
    //page1 and others pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }
    //other pages
    if (curPage < numPages) {
      const allMarkup =
        this._generateMarkupButton('next', curPage) +
        this._generateMarkupButton('prev', curPage);
      return allMarkup;
    }
    //page1 and no others pages
    return '';
  }

  _generateMarkupButton(btnType, curPage) {
    let btnDirection, pageNum;
    if (btnType === 'prev') {
      btnDirection = 'left';
      pageNum = curPage - 1;
    }
    if (btnType === 'next') {
      btnDirection = 'right';
      pageNum = curPage + 1;
    }
    //console.log(pageNum);
    return `
    <button data-goto="${pageNum}" class="btn--inline pagination__btn--${btnType}">
        <span>Page ${pageNum}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${btnDirection}"></use>
        </svg>
    </button>`;
  }
}

export default new PaginationView();
