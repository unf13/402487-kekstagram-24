import {photoDescriptions} from './photo-description-generation.js';
import {createMiniatures} from './miniature-creation.js';
import {addUploadFileInputEventListener} from './editing-form.js';


const templateContent = document.getElementById('picture').content;// получим контент шаблона
const picturesContainer = document.querySelector('.pictures');// и контейнер, куда нужно поместить миниатюры

addUploadFileInputEventListener();
createMiniatures(templateContent,picturesContainer,photoDescriptions);
