import {isEscapeKey} from './utils.js';

const FORM_SEND_ADDRESS = 'https://24.javascript.pages.academy/kekstagram';
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_MAX_NUMBER = 5;
const HASHTAG_MAX_LENGTH = 20;

const uploadFileInput = document.querySelector('#upload-file');
const imageUploadForm = document.querySelector('.img-upload__form');
const editingForm = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const commentTextArea = document.querySelector('.text__description');
const hashtagsInput = document.querySelector('.text__hashtags');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

const showErrorMessage = (message,element) =>{

  element.setCustomValidity(message);
  element.reportValidity();
  element.style.border = 'thick solid red';

};

const resetValidityState = () =>{
  hashtagsInput.setCustomValidity('');
  hashtagsInput.style.border = '';
};

const onHashtagsInputChange = () => {
  resetValidityState();
};

const checkHashtagsValidity = (evt) =>{

  resetValidityState();

  const hashtagsValue = imageUploadForm.hashtags.value.trim();

  let errorMessage = '';

  if (hashtagsValue.length > 0){

    const hashtags = hashtagsValue.split(' ').filter((hashtag) => hashtag.length > 0);

    if (hashtags.length > HASHTAG_MAX_NUMBER) {
      errorMessage += `Ошибка: обнаружены повторяющиеся хэш-теги
      `;
    }

    const upperCaseHashtags = hashtags.map((current)=>current.toUpperCase());
    const duplicates = upperCaseHashtags.filter((item, index) => upperCaseHashtags.indexOf(item) !== index);

    if(duplicates.length > 0){
      errorMessage += `Ошибка: обнаружены повторяющиеся хэш-теги
      `;
    }

    const regularExpression = /^[A-Za-zА-Яа-яЁё0-9]+$/;

    hashtags.forEach((hashtag) => {

      if(!regularExpression.test(hashtag.substring(1))){
        errorMessage += `Ошибка: хеш-тег "${hashtag}" содержит некорректные символы 
        `;
      }

      if(hashtag[0] !== '#'){
        errorMessage += `Ошибка: хеш-тег "${hashtag}" начинается не с символа  "#" (решётка)
        `;
      }

      if(hashtag === '#'){
        errorMessage += `Ошибка: хештег "${hashtag}" не может состоять только из одной решётки
        `;
      }

      if(hashtag.length > HASHTAG_MAX_LENGTH){
        errorMessage += `Ошибка: максимальная длина  хэш-тега  "${hashtag}" больше 20 символов, (включая решётку)
        `;
      }


    });

    if(errorMessage.length > 0){
      evt.preventDefault();
      showErrorMessage(errorMessage,hashtagsInput);
    }

  }

};

const closeHelper = {

  closeEditingForm() {
    editingForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    resetValidityState();
    document.removeEventListener('keydown',closeHelper.onEditingFormEscKeydown);
    uploadCancelButton.removeEventListener('click',closeHelper.onUploadCancelButtonClick);
    hashtagsInput.removeEventListener('input',onHashtagsInputChange);
    uploadSubmitButton.removeEventListener('click',closeHelper.onUploadSubmitButtonClick);
    imageUploadForm.reset();
  },

  onEditingFormEscKeydown(evt){
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      if (document.activeElement === commentTextArea || document.activeElement === hashtagsInput){
        return;
      }
      closeHelper.closeEditingForm();
    }
  },

  onUploadCancelButtonClick(){
    closeHelper.closeEditingForm();
  },

  onUploadSubmitButtonClick(evt){
    checkHashtagsValidity(evt);
  },

};

const showEditingForm = () => {

  editingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',closeHelper.onEditingFormEscKeydown);
  uploadCancelButton.addEventListener('click',closeHelper.onUploadCancelButtonClick);
  imageUploadForm.action = FORM_SEND_ADDRESS;
  uploadSubmitButton.addEventListener('click',closeHelper.onUploadSubmitButtonClick);
  commentTextArea.maxlength = MAX_COMMENT_LENGTH;
  hashtagsInput.addEventListener('input',onHashtagsInputChange);
};

uploadFileInput.addEventListener('change',showEditingForm);
