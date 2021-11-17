import '../nouislider/nouislider.js';

// начало подстроки с именем эффекта в названии класса
const EFFECT_NAME_START_INDEX = 18;

const EffectStyle = {

  NONE: {filterValue:'none', units:'', min:0, max:0.1, start:0, step:0, class:'effects__preview--none'},
  CHROME: {filterValue:'grayscale', units:'', min:0, max:1, start:1, step:0.1, class:'effects__preview--chrome'},
  SEPIA: {filterValue:'sepia', units:'', min:0, max:1, start:1, step:0.1, class:'effects__preview--sepia'},
  MARVIN: {filterValue:'invert', units:'%', min:0, max:100, start:100, step:1, class:'effects__preview--marvin'},
  PHOBOS: {filterValue:'blur', units:'px', min:0, max:3, start:3, step:0.1, class:'effects__preview--phobos'},
  HEAT: {filterValue:'brightness', units:'', min:1, max:3, start:3, step:0.1, class:'effects__preview--heat'},

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
const hiddenSizeInput = uploadForm.querySelector('.scale__control--value');
const hiddenEffectLevelInput = uploadForm.querySelector('.effect-level__value');
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

const setCurrentEffect = (selectedEffect) => {

  previewImage.classList.remove(currentEffect.class);
  previewImage.classList.add(selectedEffect.class);

  currentEffect = selectedEffect;

  effectLevel.value = currentEffect.start;

  if (currentEffect.filterValue === EffectStyle.NONE.filterValue) {
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
      to:  (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from:  (value) => parseFloat(value),
    },
  });

};

const onEffectListItemClick = (evt) =>{

  if (evt.target.classList.contains('effects__preview')){

    const selectedEffectClassName = evt.target.classList[1];

    if (selectedEffectClassName !== currentEffect.class) {

      const selectedEffect = EffectStyle[selectedEffectClassName.slice(EFFECT_NAME_START_INDEX).toUpperCase()];
      setCurrentEffect(selectedEffect);

    }

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

const resetAllEffects = () => {

  currentImageSize = SizeValue.DEFAULT;
  setImageSize();
  setCurrentEffect(DEFAULT_EFFECT);

};

const prepareEffectsSettings = () =>{

  addEffectsEventListeners();
  resetAllEffects();

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

  if (currentEffect.filterValue !== EffectStyle.NONE.filterValue) {
    previewImage.style.filter = `${currentEffect.filterValue}(${effectLevel.value}${currentEffect.units})`;
  }

});

export {removeEffectsEventListeners,prepareEffectsSettings,resetAllEffects};
