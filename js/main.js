
/* source - https://learn.javascript.ru/task/random-int-min-max */
function randomInteger(min, max) {

    if (max <= min) {
        return min;
    }

    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function lengthNotExceeded(stringToCheck, maxLength) {

    return stringToCheck.length <= maxLength;

}

randomInteger(1, 3);
lengthNotExceeded('Hello, Keks! Here goes my comment..', 140);