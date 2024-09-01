export {createElement, gallowsManBlock, underscoresNode, hint, incorrectGuessesCounter, keyboard, modal, 
        modalMessage, correctWord, playAgainButton};

function createElement(tag, classList, parentElement){
  const newElement = document.createElement(tag);
  newElement.classList.add(...classList);
  parentElement.appendChild(newElement);
  return newElement;
}

const wrapper  = createElement("div", ["app__wrapper"], document.body);
const container = createElement("main", ["app__container"], wrapper);
const gallowsPart = createElement("div", ["app__gallows", "gallows"], container);
const quizPart = createElement("div", ["app__quiz", "quiz"], container);
const quizPartContainer = createElement("div", ["quiz__container"], quizPart);
const gallowsImageBlock = addContentToGallowsPart();
const gallowsManBlock = createGallowsManBlock();
const row1 = createElement("div", ["quiz__row1"], quizPartContainer);
const underscoresNode = createElement("div", ["quiz__underscores"], row1);
const hint = createHint();
const incorrectGuessesCounter = createIncorrectGuessesCounter();
const keyboard = createKeyboard();
const modal = createElement("div", ["app__modal", "modal", "hidden"], document.body);
const modalBlock = createElement("div", ["modal__block"], modal);
const modalMessage = createElement("span", ["modal__message"], modalBlock);
const correctWord = createCorrectWord();
const playAgainButton = createElement("button", ["modal__button"], modalBlock);
playAgainButton.innerHTML = "играть еще раз";

function addContentToGallowsPart(){
  const gallowsImageBlock = createElement("div", ["gallows__img-block"], gallowsPart);
  const gallowsImg = createElement("img", ["gallows__img"], gallowsImageBlock);
  gallowsImg.src = "./assets/gallows.png";
  const header = createElement("h1", ["gallows__header"], gallowsPart);
  header.innerHTML = "HANGMAN GAME";
  return gallowsImageBlock;
}

function createGallowsManBlock(){
  const gallowsManBlock = createElement("div", ["gallows__man-block", "man-block"], gallowsImageBlock);
  const manHead = createElement("div", ["man-block__head", "hidden"], gallowsManBlock);
  const manBody = createElement("div", ["man-block__body", "hidden"], gallowsManBlock);
  const rightArm = createElement("div", ["man-block__right-arm", "hidden"], gallowsManBlock);
  const leftArm = createElement("div", ["man-block__left-arm", "hidden"], gallowsManBlock);
  const rightLeg = createElement("div", ["man-block__right-leg", "hidden"], gallowsManBlock);
  const leftLeg = createElement("div", ["man-block__left-leg", "hidden"], gallowsManBlock);
  return gallowsManBlock;
}

function createHint(){
  const hintBlock = createElement("div", ["quiz__hint"], row1);
  const span = createElement("span",[], hintBlock);
  span.innerHTML = "Подсказка: "
  const hint = createElement("span", [], hintBlock);
  return hint;
}

function createIncorrectGuessesCounter(){
  const incorrectGuessesBlock = createElement("div", ["quiz__incorrect-guesses"], quizPartContainer);
  const span = createElement("span", [], incorrectGuessesBlock);
  span.innerHTML = "Неправильных догадок: ";
  const counter = createElement("span", [], incorrectGuessesBlock);
  return counter;
}

function createKeyboard(){
  const keyboard = createElement("div", ["quiz__keyboard", "keyboard"], quizPartContainer);
  for (let i = 1040; i < 1072; i+=1){
    const key = createElement("button", ["keyboard__key"], keyboard);
    key.innerHTML = String.fromCharCode(i);
  }
  return keyboard;
}

function createCorrectWord(){
  const correctWordBlock = createElement("div", ["modal__word"], modalBlock);
  const correctWordSpan = createElement("span", [], correctWordBlock);
  correctWordSpan.innerHTML = "правильный ответ: "
  const correctWord = createElement("span", [], correctWordBlock);
  return correctWord;
}


