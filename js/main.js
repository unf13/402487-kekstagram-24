import {photoDescriptions} from './photo-description-generation.js';
import {createMiniatures} from './miniature-creation.js';
import './editing-form.js';

const templateContent = document.getElementById('picture').content;// получим контент шаблона
const picturesContainer = document.querySelector('.pictures');// и контейнер, куда нужно поместить миниатюры

createMiniatures(templateContent,picturesContainer,photoDescriptions);


