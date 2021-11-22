import {objectForChecking} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');

function excludeBlanks(accumulator, value){
  return  value === '' ? accumulator : [...accumulator, value];
}

function getArrayWithoutVoids (data){
  return data.reduce(excludeBlanks, []);
}


function checkForAnError (testedHashtag){
  function checkRule({checkValue}){
    return checkValue(testedHashtag);
  }
  objectForChecking.find(checkRule);
}

function makeLowerCase(value){
  return value.toLowerCase();
}

function getHashTagsArray (inputValue)  {
  const arrayOfHashtags = inputValue.split(' ').map(makeLowerCase);
  return getArrayWithoutVoids(arrayOfHashtags);
}

function checkHashTags (hashtagsToCheck)  {
  const hashTags = getHashTagsArray(hashtagsToCheck);
  const {customValidity} = checkForAnError(hashTags);
  if (customValidity) {
    hashTagInput.setCustomValidity(customValidity);
  } else {
    hashTagInput.setCustomValidity('');
  }
}

function deleteValidityMessages  (input) {
  function handleInput (){
    input.setCustomValidity('');
  }
  input.addEventListener('input', handleInput);
}

function handleFormInvalid (evt){
  evt.target.style.border = '3px solid red';
}

function handleFormInput (evt){
  evt.target.style.border = '';
}

export function checkLoadForm () {
  deleteValidityMessages(hashTagInput);

  function handleSubmitButtonClick(){
    checkHashTags(hashTagInput.value);
  }

  submitButton.addEventListener('click', handleSubmitButtonClick);

  uploadForm.addEventListener('invalid', handleFormInvalid, true);

  uploadForm.addEventListener('input', handleFormInput);
}
