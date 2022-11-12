import icons from 'url:../../img/icons.svg'; //Parcel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      //   console.log(btn);

      if (!btn) return;
      const goToPage = +btn.dataset.goto; //+ convert to Number
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const generateMarkupMethod = {
      next: `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`,
      previous: `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
        </button>
        `,
    };

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return generateMarkupMethod.next;
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return generateMarkupMethod.previous;
    }
    //Other page
    if (curPage < numPages) {
      return generateMarkupMethod.previous + generateMarkupMethod.next;
    }
    //Page 1, and there are NO pages
    return ''; //return nothing
  }
}

export default new PaginationView();
