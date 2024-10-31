//import icons from '../img/icons.svg' // for parcel v1
import icons from 'url:../../img/icons.svg'; // for parcel v2

import View from './view.js';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
      this._addHandlerShowWindow();
      this._addHandlerHideWindow()
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }
    
  addHandlerUpload() {
      this._parentEl.addEventListener('submit', function (e) {
          e.preventDefault()
          const data = [...new FormData(this)]
          console.log(data);
      })
  }

  _generateHtml() {}
}

export default new AddRecipeView();
