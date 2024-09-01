import {
  underscoresNode,
  createElement,
  hint,
  incorrectGuessesCounter,
  keyboard,
  gallowsManBlock,
  modal,
  modalMessage,
  correctWord,
  playAgainButton,
} from "../app.js";

let lastRandomNumber;

function generateWord() {
  const wordsArray = [
    { word: "Кот", hint: "Какое животное часто мурлычет?" },
    {
      word: "Кеширование",
      hint: "Механизм сохранения копии данных или результата вычислений для ускорения будущего доступа.",
    },
    {
      word: "Рефакторинг",
      hint: "Процесс изменения структуры кода, с целью улучшения его читаемости, понимаемости и поддерживаемости.",
    },
    {
      word: "Препроцессор",
      hint: "Инструмент, используемый для расширения функциональности языка стилей CSS, такой как Sass или Less.",
    },
    {
      word: "Медузы",
      hint: "Существуют на Земле уже более 500 миллионов лет.",
    },
    { word: "Октопус", hint: "Имеет три сердца и синюю кровь." },
    {
      word: "Возрождение",
      hint: "Период в истории Европы, характеризующийся развитием искусства, литературы и науки.",
    },
    { word: "железнодорожный", hint: "Какой узел нельзя развязать?" },
    { word: "дракула", hint: "Вампир" },
    { word: "геракл", hint: "Сын Зевса" },
    { word: "Анаконда", hint: "Змея" },
    {
      word: "Полтергейст",
      hint: "Зловещий дух, известный своей способностью создавать шумы и перемещать предметы.",
    },
    {
      word: "Призрак",
      hint: "Невидимое существо, предположительно душа умершего человека.",
    },
    {
      word: "Экзорцизм",
      hint: "Обряд изгнания демонов или злых духов из человека или места.",
    },
    {
      word: "Проклятие",
      hint: "Магическая формула или действие, навлекающее несчастье или беду.",
    },
    { word: "Апокалипсис", hint: "Конец света" },
    {
      word: "Ритуал",
      hint: "Церемония с мистическими действиями, часто связанная с темными силами.",
    },
    {
      word: "Мистика",
      hint: "Область, связанная с загадочными и сверхъестественными явлениями.",
    },
  ];
  let randomNumber = Math.floor(Math.random() * wordsArray.length);
  while (randomNumber === lastRandomNumber) {
    randomNumber = Math.floor(Math.random() * wordsArray.length);
  }
  const wordsObject = wordsArray[randomNumber];
  lastRandomNumber = randomNumber;
  return wordsObject;
}

function createUnderscores(word) {
  const underscoresCount = word.length;
  let underscores = [];
  for (let i = 0; i < underscoresCount; i += 1) {
    const underscore = createElement(
      "span",
      ["quiz__underscore", "unguessed"],
      underscoresNode
    );
    underscore.innerHTML = "__";
    underscores.push(underscore);
  }
  function controlUnderscores(positionsOfLetters, letter, word) {
    positionsOfLetters.map((el) => {
      const curentElement = underscores[el];
      curentElement.classList.add("guessed");
      curentElement.classList.remove("unguessed");
      curentElement.innerHTML = letter;
    });
    const isThereUnguessedLetter = underscores.some((el) =>
      el.classList.contains("unguessed")
    );
    if (!isThereUnguessedLetter) {
      keyboard.style.pointerEvents = "none";
      document.removeEventListener("keydown", specificListener);
      setTimeout(() => {
        controlModal(true, word);
      }, 800);
    }
  }
  return controlUnderscores;
}

function generateHint(hintText) {
  hint.innerHTML = hintText;
}

function controlIncorrectGuesses() {
  let incorrectGuesses = 0;
  incorrectGuessesCounter.innerHTML = `0/6`;
  function countIncorrectGuesses(isQuestionIncorrect = false, word) {
    if (isQuestionIncorrect) {
      incorrectGuesses += 1;
      gallowsManBlock.childNodes[incorrectGuesses - 1].classList.remove(
        "hidden"
      );
      incorrectGuessesCounter.innerHTML = `${incorrectGuesses}/6`;
      if (incorrectGuesses === 6) {
        keyboard.style.pointerEvents = "none";
        document.removeEventListener("keydown", specificListener);
        setTimeout(() => {
          controlModal(false, word);
        }, 800);
      }
    }
  }
  return countIncorrectGuesses;
}

function controlModal(isWin, word) {
  modal.classList.remove("hidden");
  document.body.classList.add("lock");
  correctWord.innerHTML = word;
  if (isWin) {
    modalMessage.innerHTML = "Победа!";
  } else {
    modalMessage.innerHTML = "Вы проиграли =(";
  }
  function playAgainButtonListener() {
    modal.classList.add("hidden");
    document.body.classList.remove("lock");
    startGame();
    setTimeout(() => {
      keyboard.style.pointerEvents = "auto";
    }, 500);
    playAgainButton.removeEventListener("click", playAgainButtonListener);
  }
  playAgainButton.addEventListener("click", playAgainButtonListener);
}

function startGame() {
  const childNodesArray = Array.from(underscoresNode.childNodes);
  childNodesArray.forEach((el) => {
    underscoresNode.removeChild(el);
  });
  const childNodesKeyboardArray = Array.from(keyboard.childNodes);
  childNodesKeyboardArray.forEach((el) => {
    el.classList.remove("disabled");
    el.disabled = false;
  });
  gallowsManBlock.childNodes.forEach((element) => {
    element.classList.add("hidden");
  });
  const wordsObject = generateWord();
  const controlUnderscores = createUnderscores(wordsObject.word);
  generateHint(wordsObject.hint);
  const countIncorrectGuesses = controlIncorrectGuesses();
  controlGame(
    wordsObject,
    countIncorrectGuesses,
    controlUnderscores,
    wordsObject.word
  );
}

function keyAndVirtualKeyboardListenerWrapper(
  countIncorrectGuesses,
  controlUnderscores,
  word
) {
  return function keyAndVirtualKeyboardListener(event) {
    let key;
    let letter;
    if (event.type === "keydown") {
      if (event.key.length === 1 && /[а-яА-Я]/.test(event.key)) {
        letter = event.key.toUpperCase();
        const virtualKeysArray = Array.from(keyboard.childNodes);
        key = virtualKeysArray.find((el) => el.innerHTML === letter);
      } else {
        return;
      }
    } else if (event.target.classList.contains("keyboard__key")) {
      key = event.target;
      letter = event.target.innerHTML;
    } else {
      return;
    }
    if (word.includes(letter)) {
      const positionsOfLetters = [];
      let lastLetterPosition = word.indexOf(letter);
      while (lastLetterPosition !== -1) {
        positionsOfLetters.push(lastLetterPosition);
        lastLetterPosition = word.indexOf(letter, lastLetterPosition + 1);
      }
      controlUnderscores(positionsOfLetters, letter, word);
    } else {
      countIncorrectGuesses(true, word);
    }
    key.disabled = "true";
    key.classList.add("disabled");
  };
}

let specificListener;

function controlGame(wordsObject, countIncorrectGuesses, controlUnderscores) {
  const word = wordsObject.word.toUpperCase();
  if (specificListener) {
    keyboard.removeEventListener("click", specificListener);
    document.removeEventListener("keydown", specificListener);
  }
  specificListener = keyAndVirtualKeyboardListenerWrapper(
    countIncorrectGuesses,
    controlUnderscores,
    word
  );

  keyboard.addEventListener("click", specificListener);
  document.addEventListener("keydown", specificListener);
}
startGame();
