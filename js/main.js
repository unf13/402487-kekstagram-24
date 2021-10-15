
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Мария',
  'Артем',
  'Ольга',
  'Петр',
  'Наталья',
];

const DESCRIPTIONS_TEXTS = [
  'Фото кота в лунном свете.',
  'Кот среди подсолнухов. Подражание ван Гогу.',
  'Экзистенциальные основы бытия кошачьей жизни.',
  'Кот моей бабушки.',
  'Я и мой кот.',
  'Кот в поисках смысла.',
  'Моя любимая кошка.',
];

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

checkStringLength('Hello, Keks! Here goes my comment..', 140);

const generateRandomId = () => getRandomInteger(0,1000) + new Date().getTime();

const createComment = () => {
  const randomMessageIndex = getRandomInteger(0,MESSAGES.length-1);
  const randomNameIndex = getRandomInteger(0,NAMES.length-1);
  const randomAvatarIndex = getRandomInteger(0,NAMES.length-1);
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
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS_TEXTS[randomDescriptionIndex],
    likes: getRandomInteger(15,200),
    comments: commentsList,
  };
};

const generatePhotoDescriptions = () => {
  for (let id = 1; id <= 25; id++) {
    createPhotoDescription(id);
  }
};

generatePhotoDescriptions();
