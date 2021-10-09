/* source - https://learn.javascript.ru/task/random-int-min-max */
const randomInteger = (min, max) => {

  min = Math.abs(min);
  max = Math.abs(max);

  if (max <= min) {
    return min;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const lengthNotExceeded = (stringToCheck, maxLength) => stringToCheck.length <= maxLength;


randomInteger(1, 3);
lengthNotExceeded('Hello, Keks! Here goes my comment..', 140);
