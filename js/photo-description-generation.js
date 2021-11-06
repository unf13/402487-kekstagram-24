import {getRandomInteger,generateRandomId} from './utils.js';
import {DESCRIPTIONS_TEXTS,MESSAGES,NAMES} from './data.js';

const createComment = () => {
  const randomMessageIndex = getRandomInteger(0,MESSAGES.length-1);
  const randomNameIndex = getRandomInteger(0,NAMES.length-1);
  const randomAvatarIndex = getRandomInteger(1,NAMES.length-1);
  const randomID = generateRandomId();
  return {
    id: randomID,
    avatar: `img/avatar-${randomAvatarIndex}.svg`,
    message: MESSAGES[randomMessageIndex],
    name: NAMES[randomNameIndex],
  };
};

const createPhotoDescription = (id) => {
  const randomDescriptionIndex = getRandomInteger(0,DESCRIPTIONS_TEXTS.length-1);
  const commentsList = Array.from({length:id},createComment);// пусть количество комментариев будет, допустим, равно id
  return {
    id: id,
    url: `../photos/${id}.jpg`,
    description: DESCRIPTIONS_TEXTS[randomDescriptionIndex],
    likes: getRandomInteger(15,200),
    comments: commentsList,
  };
};

const generatePhotoDescriptions = () => {
  const descriptions = [];
  for (let id = 1; id <= 25; id++) {
    descriptions.push(createPhotoDescription(id));
  }
  return descriptions;
};

const photoDescriptions = generatePhotoDescriptions();

export {photoDescriptions};
