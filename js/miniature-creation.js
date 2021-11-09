import {showBigPicture} from './full-size-pictures.js';

const onMiniatureImageClick = (evt)=>{
  if (evt.target.classList.contains('picture__img')) {
    showBigPicture(evt.target.dataset.photoId);
  }
};

const createMiniatures = (templateContent,picturesContainer,photoDescriptions) => {

  const fragment = document.createDocumentFragment();

  photoDescriptions.forEach((description) => {
    const newPicture = templateContent.cloneNode(true);
    const image = newPicture.querySelector('img');
    image.src = description.url;
    image.dataset.photoId = description.id;
    newPicture.querySelector('.picture__likes').textContent = description.likes;
    newPicture.querySelector('.picture__comments').textContent = description.comments.length;
    fragment.appendChild(newPicture);
  });

  picturesContainer.appendChild(fragment);
  picturesContainer.addEventListener('click',onMiniatureImageClick);

};


export {createMiniatures};
