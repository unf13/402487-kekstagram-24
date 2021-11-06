/* source - https://learn.javascript.ru/task/random-int-min-max */
const getRandomInteger = (min, max) => {

  min = Math.abs(min);
  max = Math.abs(max);

  if (max <= min) {
    return min;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const checkStringLength = (stringToCheck, maxLength) => stringToCheck.length <= maxLength;

const generateRandomId = () => getRandomInteger(0,1000) + new Date().getTime();

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger,checkStringLength,generateRandomId,isEscapeKey};
