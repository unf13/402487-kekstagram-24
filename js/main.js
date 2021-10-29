import {generatePhotoDescriptions} from './photo-description-generation.js';
import {createMiniatures} from './miniature_creation.js';

const templateContent = document.getElementById('picture').content;// получим контент шаблона
const picturesContainer = document.querySelector('.pictures');// и контейнер, куда нужно поместить миниатюры

/*в задании не указано сколько миниатюр для примера нужно создать, пусть будет, допустим, 5 */
createMiniatures(templateContent,picturesContainer,5);

generatePhotoDescriptions(); // вызов этой функции остался с прошлых заданий, чтобы не ругался линтер
