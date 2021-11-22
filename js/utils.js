function isEscapeKey (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function onEscKeyDown (evt, callback)  {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscKeyDown);
    if(typeof callback === 'function'){
      callback();
    }
  }
}

function getZeroAverageRandom(){
  return Math.random() - 0.5;
}

function shuffleArray (data) {
  return data.sort(getZeroAverageRandom);
}

export {
  isEscapeKey,
  onEscKeyDown,
  shuffleArray
};
