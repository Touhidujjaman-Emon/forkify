//import icons from '../img/icons.svg' // for parcel v1
import icons from 'url:../../img/icons.svg'; // for parcel v2

import View from './view.js';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateHtml() {
    const curPage = this._data.page;
    
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    

    // Page 1 , and there are other pages
    if (curPage === 1 && 1 < numPage) {
      return `
      <button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // Last page
    if (curPage === numPage && 1 < numPage) {
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }

    // Other page
    if (curPage < numPage) {
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          
          <button data-goto = "${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }

    // Page 1 , and there are NO other pages
    return ``;
  }
}

export default new paginationView();
