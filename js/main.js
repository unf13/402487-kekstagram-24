import {generatePhotoDescriptions} from './photo-description-generation.js';
import {createMiniatures} from './miniature_creation.js';

const templateContent = document.getElementById('picture').content;// получим контент шаблона
const picturesContainer = document.querySelector('.pictures');// и контейнер, куда нужно поместить миниатюры

const photoDescriptions = generatePhotoDescriptions();

createMiniatures(templateContent,picturesContainer,photoDescriptions);


