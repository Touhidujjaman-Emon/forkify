//import icons from '../img/icons.svg' // for parcel v1
import icons from 'url:../../img/icons.svg'; // for parcel v2
import previewView from './previewView.js';
import View from './view.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _successMessage = '';

  _generateHtml() {
    return this._data.map(result => previewView.render( result, false)).join('');
  }

}

export default new ResultView();
