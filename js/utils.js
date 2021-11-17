
const ESCAPE_KEY = 'Escape';
const DEBOUNCE_TIMEOUT = 500;

/* source - https://learn.javascript.ru/task/random-int-min-max */
const getRandomInteger = (min, max) => {

  min = Math.abs(min);
  max = Math.abs(max);

  if (max <= min) {
    return min;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const isEscapeKey = (evt) => evt.key === ESCAPE_KEY;

const showAlert = (message) => {

  const alertContainer = document.createElement('div');
  const textMessage = document.createElement('p');
  textMessage.textContent = message;

  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '300px';

  alertContainer.style.left = '50%';
  alertContainer.style.top = '50%';
  alertContainer.style.transform = 'translate(-50%,-50%)';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '14px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'black';

  const errorButton = document.createElement('button');
  errorButton.style.color = 'black';
  errorButton.textContent = 'Закрыть';
  alertContainer.appendChild(textMessage);
  alertContainer.appendChild(errorButton);
  document.body.classList.add('modal-open');
  document.body.appendChild(alertContainer);

  const onCloseErrorPopup = () => {
    alertContainer.remove();
    document.removeEventListener('click', onCloseErrorPopup);
    document.body.classList.remove('modal-open');
  };

  errorButton.addEventListener('click', onCloseErrorPopup);

};

const debounce = (callback) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), DEBOUNCE_TIMEOUT);
  };

};

export {getRandomInteger,isEscapeKey,showAlert,debounce};
