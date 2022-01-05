import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    // Current page
    const curPage = this._data.page;

    // How many pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const prevBtn = `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${curPage - 1}</span>
                        </button>`;

    const forwBtn = `<button data-goto="${
      curPage + 1
    }"class="btn--inline pagination__btn--next">
                        <span>Page ${curPage + 1}</span>
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                        </button>`;

    // --- A. Multiple results, now in page 1
    if (numPages > 1 && curPage === 1) {
      return forwBtn;
    }

    // --- B. Multiple results, now in last page
    if (numPages === curPage && numPages > 1) {
      return prevBtn;
    }

    // --- C. Multiple results, now in page 2/middling position
    if (numPages > curPage) {
      return prevBtn + forwBtn;
    }

    // --- D. <10 results, now in page 1
    if (numPages === curPage && numPages === 1) {
      return '';
    }
  }
}

export default new PaginationView();
