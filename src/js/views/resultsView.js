//import icons from '../img/icons.svg' // for parcel v1
import icons from 'url:../../img/icons.svg'; // for parcel v2

import View from './view.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _successMessage = '';

  _generateHtml() {
    return this._data.map(this._generateHtmlPreview).join('');
  }

  _generateHtmlPreview(result) {
    const id = window.location.hash.slice(1);
    return `
         <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>

              </div>
            </a>
          </li>
        `;
  }
}

export default new ResultView();
