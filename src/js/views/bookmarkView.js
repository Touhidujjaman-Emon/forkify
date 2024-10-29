//import icons from '../img/icons.svg' // for parcel v1
import icons from 'url:../../img/icons.svg'; // for parcel v2
import previewView from './previewView.js';
import View from './view.js';

class bookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet , Find a nice recipe and bookmark it ;)';
  _successMessage = '';

    addHandlerRender(handler) {
        window.addEventListener('load',handler)
    }
    _generateHtml() {
    return this._data.map(bookmark => previewView.render( bookmark, false)).join('');
  }

}

export default new bookmarkView();
