
import {getRandomInteger} from './utils.js';

const createMiniatures = (templateContent,picturesContainer,numberOfpictures) => {

  const fragment = document.createDocumentFragment();

  /*В тексте задания не указано количество лайков и комментариев, зададим случайным числом. Как и номер фото.*/

  for(let pictureNumber=1; pictureNumber<=numberOfpictures; pictureNumber++){

    const newPicture = templateContent.cloneNode(true);
    newPicture.querySelector('img').src = `../photos/${getRandomInteger(1,25)}.jpg`;
    newPicture.querySelector('.picture__likes').textContent = getRandomInteger(1,numberOfpictures);
    newPicture.querySelector('.picture__comments').textContent = getRandomInteger(1,numberOfpictures);

    fragment.appendChild(newPicture);

  }

  picturesContainer.appendChild(fragment);

};

export {createMiniatures};
