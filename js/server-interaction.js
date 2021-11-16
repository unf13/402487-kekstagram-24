import {closeHelper as editFormCloseHelper} from './editing-form.js';
import {isEscapeKey} from './utils.js';

const LOADING_URL = 'https://24.javascript.pages.academy/kekstagram/data';
const UPLOADING_URL = 'https://24.javascript.pages.academy/kekstagram';

let resultButton;
let messageContainer;
let photoDescriptions;

const dataSendResultPopup = {

  showPopup(result) {
    editFormCloseHelper.closeEditingForm();
    const templateContent = document.querySelector(`#${result}`).content.cloneNode(true);
    messageContainer = templateContent.querySelector('section');
    resultButton = templateContent.querySelector('button');
    document.body.appendChild(messageContainer);
    resultButton.addEventListener('click',this.onResultButtonClick);
    document.body.addEventListener('click',this.onBodyClick);
    document.body.addEventListener('keydown',this.onPopupEscKeydown);
  },

  closePopup() {
    resultButton.removeEventListener('click',this.onResultButtonClick);
    document.body.removeEventListener('click',this.onBodyClick);
    document.body.removeChild(messageContainer);
  },

  onResultButtonClick() {
    dataSendResultPopup.closePopup();
  },

  onBodyClick() {
    dataSendResultPopup.closePopup();
  },

  onPopupEscKeydown(evt){
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      dataSendResultPopup.closePopup();
    }
  },

};

const getData = (onSuccess, onError) => {fetch(
  LOADING_URL,
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    photoDescriptions = data;
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });};

const sendData = (form) => {

  fetch(
    UPLOADING_URL,
    {
      method: 'POST',
      body: new FormData(form),
    },
  ).then((response) => {
    if (response.ok) {
      dataSendResultPopup.showPopup('success');
    } else {
      dataSendResultPopup.showPopup('error');
    }
  }).catch(() => {
    dataSendResultPopup.showPopup('error');
  });

};


export{getData,sendData,photoDescriptions};

