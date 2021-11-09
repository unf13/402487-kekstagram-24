import {photoDescriptions} from './photo-description-generation.js';
import {isEscapeKey} from './utils.js';

const COMMENTS_NUMBER = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage     = bigPictureContainer.querySelector('.big-picture__img img');
const closeElement        = bigPictureContainer.querySelector('#picture-cancel');
const socialCommentCount  = bigPictureContainer.querySelector('.social__comment-count');
const commentsCount       = bigPictureContainer.querySelector('.comments-count');
const commentsLoader      = bigPictureContainer.querySelector('.comments-loader');
const likesCount          = bigPictureContainer.querySelector('.likes-count');

const photoDescription    = bigPictureContainer.querySelector('.social__caption');
const commentsContainer   = bigPictureContainer.querySelector('.social__comments');

let pictureData;

const loadNewComments = (startIndex,initialLoading) => {

  const comments = pictureData.comments;
  if (comments.length === 0 || startIndex >= comments.length) {
    return 0;
  }

  const commentsFragment = document.createDocumentFragment();
  const endIndex = Math.min(startIndex + COMMENTS_NUMBER - 1, comments.length - 1);

  let loadedCommentsNumber = 0;

  for (let index = startIndex; index <= endIndex; index++) {
    const commentData = pictureData.comments[index];
    const commentTemplate = commentsContainer.querySelector('.social__comment:nth-child(1)').cloneNode(true);
    const avatarImage     = commentTemplate.querySelector('.social__picture');
    avatarImage.src = commentData.avatar;
    avatarImage.alt = commentData.name;
    commentTemplate.querySelector('.social__text').textContent = commentData.message;
    commentTemplate.dataset.commentIndex = index;
    commentsFragment.append(commentTemplate);
    loadedCommentsNumber++;
  }

  if(initialLoading) {
    commentsContainer.replaceChildren(commentsFragment);
  } else {
    commentsContainer.append(commentsFragment);
  }

  return loadedCommentsNumber;

};

const setCommentsLoaderVisibility = (commentsleftToLoad) =>{

  const shouldBeHidden = (commentsleftToLoad === 0);

  if (shouldBeHidden && !commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.add('hidden');
  }

  if (!shouldBeHidden && commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.remove('hidden');
  }


};

const fillBigPictureData = (photoId) =>{

  pictureData = photoDescriptions.find((element)=>element.id === Number(photoId));
  bigPictureImage.src = pictureData.url;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;
  photoDescription.textContent = pictureData.description;

  const commentsLoaded = loadNewComments(0, true);
  socialCommentCount.childNodes[0].nodeValue = `${commentsLoaded} из `;

  setCommentsLoaderVisibility(pictureData.comments.length - commentsLoaded);

};

// функция закрытия попапа
const closeBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const closeHelper = {

  // закрытие по клавише Escape
  onBigPictureEscKeydown(evt){
    if(isEscapeKey(evt)){
      evt.preventDefault();
      closeBigPicture();
      // this в данном случае будет не closeHelper, поэтому явно указываем его
      closeHelper.removeEventListeners();
    }
  },

  // закрытие по клику на "крестике" попапа
  onCloseElementClick() {
    closeBigPicture();
    closeHelper.removeEventListeners();
  },

  onCommentsLoaderClick(){

    let commentIndex = 0;
    const lastComment = commentsContainer.querySelector('.social__comment:last-child');
    if (lastComment) {
      commentIndex = Number(lastComment.dataset.commentIndex) + 1;
    }

    const loadedCommentsNumber = loadNewComments(commentIndex,false);
    let currentCommentsCount = parseInt(socialCommentCount.textContent,10);

    if (isNaN(currentCommentsCount)) {
      currentCommentsCount = 0;
    }

    const allLoadedCommentsNumber = currentCommentsCount + loadedCommentsNumber;
    socialCommentCount.childNodes[0].nodeValue = `${allLoadedCommentsNumber} из `;

    setCommentsLoaderVisibility(pictureData.comments.length - allLoadedCommentsNumber);
  },

  removeEventListeners() {
    document.removeEventListener('keydown',this.onBigPictureEscKeydown);
    closeElement.removeEventListener('click',this.onCloseElementClick);
    commentsLoader.removeEventListener('click',this.onCommentsLoaderClick);
  },

};


const showBigPicture = (photoId) => {
  bigPictureContainer.classList.remove('hidden');
  commentsLoader.addEventListener('click',closeHelper.onCommentsLoaderClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',closeHelper.onBigPictureEscKeydown);
  closeElement.addEventListener('click',closeHelper.onCloseElementClick);
  fillBigPictureData(photoId);
};

export {showBigPicture};
