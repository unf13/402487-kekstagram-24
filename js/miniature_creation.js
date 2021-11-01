
const createMiniatures = (templateContent,picturesContainer,photoDescriptions) => {

  const fragment = document.createDocumentFragment();

  photoDescriptions.forEach((description) => {
    const newPicture = templateContent.cloneNode(true);
    newPicture.querySelector('img').src = description.url;
    newPicture.querySelector('.picture__likes').textContent = description.likes;
    newPicture.querySelector('.picture__comments').textContent = description.comments.length;
    fragment.appendChild(newPicture);
  });

  picturesContainer.appendChild(fragment);

};

export {createMiniatures};
