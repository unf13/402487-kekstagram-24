import '../nouislider/nouislider.js';

const EffectStyle = {

  NONE: {filterValue:'none', units:'', min:0, max:0.1, start:0, step:0},
  CHROME: {filterValue:'grayscale', units:'', min:0, max:1, start:1, step:0.1},
  SEPIA: {filterValue:'sepia', units:'', min:0, max:1, start:1, step:0.1},
  MARVIN: {filterValue:'invert', units:'%', min:0, max:100, start:100, step:1},
  PHOBOS: {filterValue:'blur', units:'px', min:0, max:3, start:3, step:0.1},
  HEAT: {filterValue:'brightness', units:'', min:1, max:3, start:3, step:0.1},

};

const DEFAULT_EFFECT = EffectStyle.NONE;

const SizeValue = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25,
};

const uploadForm = document.querySelector('.img-upload__form');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger  = uploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const hiddenSizeInput = document.createElement('input');
const hiddenEffectLevelInput = document.createElement('input');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectsList = uploadForm.querySelector('.effects__list');
const effectLevel = uploadForm.querySelector('.effect-level__value');

let currentImageSize = SizeValue.DEFAULT;
let currentEffect = DEFAULT_EFFECT;

const setImageSize = () =>{
  scaleControlValue.value = `${currentImageSize}%`;
  previewImage.style = `transform: scale(${currentImageSize / 100})`;
  hiddenSizeInput.value = currentImageSize;
};

const onScaleSmallerClick = () => {
  if(currentImageSize > SizeValue.MIN) {
    currentImageSize -= SizeValue.STEP;
    setImageSize();
  }
};

const onScaleBiggerClick = () => {
  if(currentImageSize < SizeValue.MAX) {
    currentImageSize += SizeValue.STEP;
    setImageSize();
  }
};

const onEffectListItemClick = (evt) =>{

  if (evt.target.classList.contains('effects__preview')){

    const currentEffectClassName = evt.target.classList[1];
    if (previewImage.classList.length > 0){
      const currentImageClassName = previewImage.classList[0];
      if (currentEffectClassName === currentImageClassName) {
        return;
      }
      previewImage.classList.remove(currentImageClassName);
    }
    previewImage.classList.add(currentEffectClassName);
    currentEffect = EffectStyle[currentEffectClassName.slice(18).toUpperCase()];

    effectLevel.value = currentEffect.start;

    if (currentEffect.filterValue === 'none') {
      sliderContainer.style.display = 'none';
    } else {
      sliderContainer.style.display = 'block';
    }

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: currentEffect.min,
        max: currentEffect.max,
      },
      start: currentEffect.start,
      step: currentEffect.step,
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });


  }

};

const addEffectsEventListeners = () => {
  scaleSmaller.addEventListener('click',onScaleSmallerClick);
  scaleBigger.addEventListener('click',onScaleBiggerClick);
  effectsList.addEventListener('click',onEffectListItemClick);
};

const removeEffectsEventListeners = () => {
  scaleSmaller.removeEventListener('click',onScaleSmallerClick);
  scaleBigger.removeEventListener('click',onScaleBiggerClick);
};

const initializeHiddenSizeInputProperties = () =>{
  // скрытые поля для отправки на сервер по условиям домашнего задания
  hiddenSizeInput.type  = 'hidden';
  hiddenSizeInput.name  = 'hidden-image-size';
  hiddenSizeInput.value = SizeValue.DEFAULT;
  uploadForm.append(hiddenSizeInput);

  hiddenEffectLevelInput.type  = 'hidden';
  hiddenEffectLevelInput.name  = 'hidden-effect-level';
  hiddenEffectLevelInput.value = currentEffect.start;
  uploadForm.append(hiddenEffectLevelInput);

};

const prepareEffectsSettings = () =>{

  initializeHiddenSizeInputProperties();
  addEffectsEventListeners();
  setImageSize();
  sliderContainer.style.display = 'none';

};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (values, handle) => {

  effectLevel.value = values[handle];
  hiddenEffectLevelInput.value = effectLevel.value;

  if (currentEffect.filterValue !== 'none') {
    previewImage.style.filter = `${currentEffect.filterValue}(${effectLevel.value}${currentEffect.units})`;
  }

});

export {removeEffectsEventListeners,prepareEffectsSettings};
