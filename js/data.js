const Hashtag = {
  GRID: '#',
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  AMOUNT: 5,
  REGULAR_EXPRESSION: new RegExp(/^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/),
};

function isFirstCharacterHash (value){
  return value[0] === Hashtag.GRID;
}
function isTooSort (value){
  return value.length < Hashtag.MIN_SIZE;
}

function isTooLong (value){
  return value.length > Hashtag.MAX_SIZE;
}

function testWithRegExp (value){
  return !Hashtag.REGULAR_EXPRESSION.test(value);
}

function hasSomeDuplicate (value, index, hashtags){
  return hashtags.indexOf(value) !== index;
}

const objectForChecking = [
  {
    customValidity: false,
    checkValue: function (testedHashtag){ return testedHashtag.length === 0;},
  },
  {
    customValidity: `Нельзя указать больше ${Hashtag.AMOUNT} хэш-тегов`,
    checkValue: function (testedHashtag){return testedHashtag.length > Hashtag.AMOUNT;},
  },
  {
    customValidity: 'Хештег должен начинаться с символа #',
    checkValue: function (testedHashtag){return !testedHashtag.every(isFirstCharacterHash);},
  },
  {
    customValidity: 'Хештег не может состоять только из одной решётки',
    checkValue: function (testedHashtag){return testedHashtag.some(isTooSort);},
  },
  {
    customValidity: `Максимальная длина одного хештега ${Hashtag.MAX_SIZE} символов, включая решётку`,
    checkValue: function (testedHashtag){ return testedHashtag.some(isTooLong);},
  },
  {
    customValidity: 'Один и тот же хештег не может быть использован дважды',
    checkValue: function (testedHashtag){return testedHashtag.some(hasSomeDuplicate);},
  },
  {
    customValidity: 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
    checkValue: function (testedHashtag){return testedHashtag.some(testWithRegExp);},
  },
  {
    customValidity: false,
    checkValue: function (testedHashtag){ return  testedHashtag;},
  },
];

export {Hashtag, objectForChecking};
