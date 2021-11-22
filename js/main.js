import {renderServerPhotos,renderRandomServerPhotos, renderMostCommentServerPhotos} from './server.js';
import './popup.js';
import './form.js';
import './scale.js';

const RERENDER_DELAY = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const body = document.querySelector('body');
const fileChooser = body.querySelector('.img-upload__input');
const preview = body.querySelector('.img-upload__preview img');
const filterForm = body.querySelector('.img-filters__form');
const filtersButtons = filterForm.querySelectorAll('.img-filters__button');
const picturesContainer = body.querySelector('.pictures.container');

function removePicture(picture){
  picture.remove();
}

function deletePhotos () {
  const picturesLinks = picturesContainer.querySelectorAll('a.picture');
  picturesLinks.forEach(removePicture);
}

function clearActive(button){
  button.classList.remove('img-filters__button--active');
}

function handleFilterFormDirect(evt){
  deletePhotos();
  filtersButtons.forEach(clearActive);

  switch (evt.target.id) {
    case 'filter-default':
      renderServerPhotos();
      evt.target.classList.add('img-filters__button--active');
      break;
    case 'filter-random':
      renderRandomServerPhotos();
      evt.target.classList.add('img-filters__button--active');
      break;
    case 'filter-discussed':
      renderMostCommentServerPhotos();
      evt.target.classList.add('img-filters__button--active');
      break;
    default:
  }
}

const handleFilterForm = _.debounce(handleFilterFormDirect, RERENDER_DELAY);

function imgFilterHandler () {
  filterForm.addEventListener('click', handleFilterForm);
}


function handleFileChooserChange (){
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  function checkFileExtension(it){
    return fileName.endsWith(it);
  }
  const matches = FILE_TYPES.some(checkFileExtension);

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
}

function loadPhoto () {
  fileChooser.addEventListener('change',handleFileChooserChange);
}

loadPhoto();
renderServerPhotos();
imgFilterHandler();
