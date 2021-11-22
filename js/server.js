import {renderPhotos} from './render.js';
import {shuffleArray} from './utils.js';

const ERROR_SHOW_TIMEOUT = 5000;
const RANDOM_SLICE = 10;
const imgFilterSection = document.querySelector('.img-filters');

function showErrorLoadMessage () {
  const errorLoadMessage = document.querySelector('section.error');
  errorLoadMessage.classList.remove('hidden');
  function removeMessage(){
    errorLoadMessage.classList.add('hidden');
  }
  setTimeout(removeMessage, ERROR_SHOW_TIMEOUT);
}

function renderServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderPhotos(data);
      imgFilterSection.classList.remove('img-filters--inactive');
    })
    .catch(showErrorLoadMessage);
}

function renderRandomServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderPhotos(
        shuffleArray(data).slice(0,RANDOM_SLICE),
      );
      imgFilterSection.classList.remove('img-filters--inactive');
    });
}

function renderMostCommentServerPhotos() {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderPhotos(
        data.sort((a, b) => b.comments.length - a.comments.length),
      );
      imgFilterSection.classList.remove('img-filters--inactive');
    });
}

export {
  renderServerPhotos,
  renderRandomServerPhotos,
  renderMostCommentServerPhotos
};
