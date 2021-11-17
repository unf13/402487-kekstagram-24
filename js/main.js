import {createMiniatures} from './miniature-creation.js';
import {addUploadFileInputEventListener} from './editing-form.js';
import {getData} from './server-interaction.js';
import {showAlert} from './utils.js';
import {showFiltersContainer} from './filter.js';

const templateContent = document.getElementById('picture').content;// получим контент шаблона
const picturesContainer = document.querySelector('.pictures');// и контейнер, куда нужно поместить миниатюры


addUploadFileInputEventListener();

const onSuccessfulPicturesLoading = (photoDescriptions) => {
  createMiniatures(templateContent,picturesContainer,photoDescriptions);
  showFiltersContainer();
};

const onFailedPicturesLoading = (err) => {
  showAlert(`Ошибка при загрузке с сервера:
   ${err}. 
   Попробуйте обновить страницу.`);
};

getData(onSuccessfulPicturesLoading,onFailedPicturesLoading);
