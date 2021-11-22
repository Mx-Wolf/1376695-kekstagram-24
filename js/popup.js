import {onEscKeyDown} from './utils.js';

const COMMENT_PAGE_SIZE = 5;

const body = document.querySelector('body');
const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('.big-picture__cancel');
const socialComments = popup.querySelector('.social__comments');
const commentTemplate = popup.querySelector('.social__comment').cloneNode(true);

function initializePhotoListEvents (pictures, photos) {
  function preparePicture(picture){
    function prepareChosenPhoto(evt){
      findChosenPhoto(evt, photos);
    }
    picture.addEventListener('click',prepareChosenPhoto);
  }
  pictures.forEach(preparePicture);
}

function closePopup () {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
  closeButton.removeEventListener('click', handleCloseButtonClick);
}

function handleCloseButtonClick () {
  closePopup();
}

function handleDocumentKeydown(evt){
  onEscKeyDown(evt, closePopup);
}

function clearCommentsList(){
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.lastChild);
  }
}

function renderPopup (photo) {

  document.addEventListener('keydown', handleDocumentKeydown);
  closeButton.addEventListener('click', handleCloseButtonClick);

  body.classList.add('modal-open');
  popup.classList.remove('hidden');

  popup.querySelector('.big-picture__img img').src = photo.url;
  popup.querySelector('.likes-count').textContent = photo.likes;
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.comments-count').textContent = photo.comments.length;

  renderCommentSection(photo.comments);
}

function createSingleComment(comment){
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
}

function renderComment (comment) {
  socialComments.appendChild(createSingleComment(comment));
}

function appendCommentElements(comments) {
  comments.forEach(renderComment);
}

function getShowingCount(comments,nextCommentIndex){
  return comments.length>nextCommentIndex?nextCommentIndex:comments.length;
}

function renderCommentSection(comments) {
  clearCommentsList();
  const socialCommentCount = popup.querySelector('.social__comment-count');
  const commentsLoader = popup.querySelector('.comments-loader');
  const currentCommentCountElement = popup.querySelector('.current-comments-count');
  currentCommentCountElement.textContent = COMMENT_PAGE_SIZE;

  let nextCommentIndex = 0;
  function calculateRenderedComments (){
    const tempCommentIndex = COMMENT_PAGE_SIZE + nextCommentIndex;
    const nextComments = comments.slice(nextCommentIndex, tempCommentIndex);
    nextCommentIndex = tempCommentIndex;
    currentCommentCountElement.textContent = getShowingCount(comments,nextCommentIndex);
    appendCommentElements(nextComments);

    if (comments.length <= nextCommentIndex) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', calculateRenderedComments);
    }
  }
  if (comments.length > nextCommentIndex) {
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', calculateRenderedComments);
  } else {
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    appendCommentElements(comments);
  }

  calculateRenderedComments();
}

function findChosenPhoto (evt, photos) {
  const target = evt.target;
  const isTargetCorrect = target.classList.contains('picture__img');

  if (!isTargetCorrect) {
    return false;
  }

  const photoId = target.closest('.picture').id;
  function isIdEqual(element){
    return Number(element.id) === Number(photoId);
  }
  const currentPhoto = photos.find(isIdEqual);

  renderPopup(currentPhoto);
}

export {initializePhotoListEvents};
