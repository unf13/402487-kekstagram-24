import {photoDescriptions} from './server-interaction.js';
import {createMiniatures} from './miniature-creation.js';
import {getRandomInteger,debounce} from './utils.js';

const RANDOM_PICTURES_NUMBER = 10;
const MIN_PHOTO_INDEX = 0;

const filtersContainer = document.querySelector('.img-filters');
const filterDefault = filtersContainer.querySelector('#filter-default');
const filterRandom = filtersContainer.querySelector('#filter-random');
const filterDiscussed = filtersContainer.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');
const templateContent = document.getElementById('picture').content;

let currentFilter = filterDefault;
const filters = [filterDefault,filterRandom,filterDiscussed];

const removePictures = () => {
  const picturesElements = picturesContainer.querySelectorAll('.picture');
  picturesElements.forEach((pictureElement) => pictureElement.remove());
};

const toggleFiltersActiveClass = (newFilter) => {

  filters.forEach((filter) => {

    if (filter === newFilter) {
      filter.classList.add('img-filters__button--active');
    } else if(filter === currentFilter) {
      filter.classList.remove('img-filters__button--active');
    }

  });

  currentFilter = newFilter;
};

const loadPicturesByDefault = () => {
  removePictures();
  createMiniatures(templateContent,picturesContainer,photoDescriptions);
};

const loadRandomPictures = () => {

  const generatedIndexes = [];
  const maxIndex = photoDescriptions.length - 1;

  while (generatedIndexes.length < RANDOM_PICTURES_NUMBER) {

    let currentIndex = getRandomInteger(MIN_PHOTO_INDEX,maxIndex);

    while(generatedIndexes.includes(currentIndex)){
      currentIndex = getRandomInteger(MIN_PHOTO_INDEX,maxIndex);
    }
    generatedIndexes.push(currentIndex);

  }

  removePictures();
  const randomPictures = photoDescriptions.filter((value,index) => generatedIndexes.includes(index));
  createMiniatures(templateContent,picturesContainer,randomPictures);
};

const loadPicturesInMostDiscussedOrder = () => {
  removePictures();
  const picturesCopy = photoDescriptions.slice();
  picturesCopy.sort((first, second) => second.comments.length - first.comments.length);
  createMiniatures(templateContent,picturesContainer,picturesCopy);
};

const onFilterDefaultClick = () => {
  if (filterDefault !== currentFilter) {
    toggleFiltersActiveClass(filterDefault);
    debounce(loadPicturesByDefault)();
  }
};

const onFilterRandomClick = () => {
  if (filterRandom !== currentFilter) {
    toggleFiltersActiveClass(filterRandom);
    debounce(loadRandomPictures)();
  }
};

const onFilterDiscussedClick = () => {
  if (filterDiscussed !== currentFilter) {
    toggleFiltersActiveClass(filterDiscussed);
    debounce(loadPicturesInMostDiscussedOrder)();
  }
};

const showFiltersContainer = () => {
  filtersContainer.classList.toggle('img-filters--inactive');
  filterDefault.addEventListener('click', onFilterDefaultClick);
  filterRandom.addEventListener('click', onFilterRandomClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);
};

export {showFiltersContainer};
