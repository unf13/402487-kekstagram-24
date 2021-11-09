import {photoDescriptions} from './photo-description-generation.js';
import {isEscapeKey} from './utils.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage     = bigPictureContainer.querySelector('.big-picture__img img');
const closeElement        = bigPictureContainer.querySelector('#picture-cancel');
const socialCommentCount  = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoader      = bigPictureContainer.querySelector('.comments-loader');
const likesCount          = bigPictureContainer.querySelector('.likes-count');
const commentsCount       = bigPictureContainer.querySelector('.comments-count');
const photoDescription    = bigPictureContainer.querySelector('.social__caption');
const commentsContainer   = bigPictureContainer.querySelector('.social__comments');


const fillBigPictureData = (photoId) =>{

  const photoData = photoDescriptions.find((element)=>element.id === Number(photoId));
  bigPictureImage.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  photoDescription.textContent = photoData.description;

  const commentsFragment = document.createDocumentFragment();

  for (let index = 0; index < photoData.comments.length; index++) {
    const commentData = photoData.comments[index];
    const commentTemplate = commentsContainer.querySelector('.social__comment:nth-child(1)').cloneNode(true);
    const avatarImage     = commentTemplate.querySelector('.social__picture');
    avatarImage.src = commentData.avatar;
    avatarImage.alt = commentData.name;
    commentTemplate.querySelector('.social__text').textContent = commentData.message;
    commentsFragment.append(commentTemplate);
  }

  commentsContainer.replaceChildren(commentsFragment);

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

  removeEventListeners() {
    document.removeEventListener('keydown',this.onBigPictureEscKeydown);
    closeElement.removeEventListener('click',this.onCloseElementClick);
  },

};

const showBigPicture = (photoId) => {
  bigPictureContainer.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',closeHelper.onBigPictureEscKeydown);
  closeElement.addEventListener('click',closeHelper.onCloseElementClick);
  fillBigPictureData(photoId);
};

export {showBigPicture};
