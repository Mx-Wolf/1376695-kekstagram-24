import {initializePhotoListEvents} from './popup.js';

const picturesBlock = document.querySelector('.pictures');
const template = document.querySelector('#picture')
  .content
  .querySelector('a.picture');

const similarListFragment = document.createDocumentFragment();

function renderSinglePhoto(photo){
  const photoElement = template.cloneNode(true);
  photoElement.id = photo.id;
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  similarListFragment.appendChild(photoElement);
}

function renderPhotos (photos) {
  photos.forEach(renderSinglePhoto);

  picturesBlock.appendChild(similarListFragment);
  const pictures = picturesBlock.querySelectorAll('a.picture');

  initializePhotoListEvents(pictures, photos);
}


export {renderPhotos};
