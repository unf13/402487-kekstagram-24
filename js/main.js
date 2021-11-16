import {createMiniatures} from './miniature-creation.js';
import {addUploadFileInputEventListener} from './editing-form.js';
import {getData} from './server-interaction.js';
import {showAlert} from './utils.js';

const templateContent = document.getElementById('picture').content;// получим контент шаблона
const picturesContainer = document.querySelector('.pictures');// и контейнер, куда нужно поместить миниатюры
let photoDescriptions;

addUploadFileInputEventListener();

const onSuccessfulPicturesLoading = (data) => {
  photoDescriptions = data;
  createMiniatures(templateContent,picturesContainer,photoDescriptions);
};

const onFailedPicturesLoading = (err) => {
  showAlert(`Ошибка при загрузке с сервера:
   ${err}. 
   Попробуйте обновить страницу.`);
};

getData(onSuccessfulPicturesLoading,onFailedPicturesLoading);

export{photoDescriptions};

