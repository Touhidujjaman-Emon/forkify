//import icons from '../img/icons.svg' // for parcel v1
import icons from 'url:../../img/icons.svg'; // for parcel v2
export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateHtml();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateHtml();

    // Convert markup(string) to a virtual dom element that lives in our memory.
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'))
    const curElements = Array.from(this._parentEl.querySelectorAll('*'))
   
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      console.log(curEl, newEl.isEqualNode(curEl));
      
      if (!newEl.isEqualNode(curEl)&& newEl.firstChild.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
    })

  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
    <div class="spinner">
    <svg>
                  <use href="${icons}#icon-loader"></use>
                  </svg>
                  </div> 
                  `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
    <svg>
    <use href="${icons}#icon-alert-triangle"></use>
    </svg>
    </div>
    <p>${message}</p>
    </div> `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `<div class="message">
    <div>
    <svg>
    <use href="${icons}#icon-smile"></use>
    </svg>
            </div>
            <p>${message}</p>
          </div> `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
