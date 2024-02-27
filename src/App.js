import React, { useEffect, useState, memo } from 'react';
import './App.css';

import words from './data/db.words.json';

import { ModalGreeting } from './components/modals/ModalGreeting';
import { ModalQuestionUser } from './components/modals/ModalQuestionUser';
import { ModalAlreadyExistsUser } from './components/modals/ModalAlreadyExistsUser';
import { ModalWasPreviousUser } from './components/modals/ModalWasPreviousUser';
import { ModalGameOverFinish } from './components/modals/ModalGameOverFinish';

const Header = memo(() => {
  return (
    <div className='Header'>
      <h1>Угадай слово!</h1>
      <p>
        Начинаем игру в словарный футбол! Вопросы могут быть с юмором! Прочитай
        описание самого слова и вводи букву в нужное поле. Если угадал верно,
        значит забил гол! Угаданная буква откроется в слове, и счет на табло
        изменится. Если введешь неверную букву, это значит, я забил гол в твои
        ворота. Когда все попытки будут использованы, увидим, кто победил.
        Итоговый счет будет на табло! Желаю удачи!
      </p>
    </div>
  );
});

const WordTask = ({
  letter$,
  title,
}) => {
  return (
    <div className='WordTask'>
      <p>{`${title}`}</p>
      <ul className='list'>
        {letter$.map((item, index) => (
          <li className='item item-word' key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Score = ({
  letterGuess,
  letterNo,
  nameUser,
  correctGuess,
  correctNo,
}) => {
  return (
    <div className='Score'>
      <div className='itemLetters itemLetters-user'>{letterGuess}</div>
      <div className='itemLetters itemLetters-comp'>{letterNo}</div>
      <div className='inner'>
        <div className={`item item-score ${correctGuess ? 'goal' : ''}`}>
          {letterGuess.length}
        </div>
        <div className={`item item-score ${correctNo ? 'goal' : ''}`}>
          {letterNo.length}
        </div>
      </div>
      <div className='gamers-inner'>
        <p className='gamers-user'>{nameUser}</p>
        <p className='gamers-comp'>Сл⚽варик</p>
      </div>
    </div>
  );
};

const FormLetter = memo(
  ({
    letterInput,
    onClickInputValue,
    onAddedLetterGuess,
    letterGuess,
    letter$,
  }) => {
    return (
      <div className='FormLetter'>
        <label htmlFor='letter'>
          Введи букву
          <input
            autoFocus
            disabled={letter$.length === letterGuess.length}
            value={letterInput}
            onChange={onClickInputValue}
            className='myInput'
            name='text'
            id='letter'
            maxLength={1}
          />
        </label>
        <button
          onClick={onAddedLetterGuess}
          className='myBtn'
          disabled={!letterInput.length}
          type='button'
        >
          ⚽ Удар!
        </button>
      </div>
    );
  }
);

function App() {
  //* Math.random() work no correct
  // function pickWord() {
  //   return words[Math.floor(Math.random() * words.length)];
  // }

  //* управляемыe inputs
  const [letterInput, setLetterInput] = useState('');
  const [nameUser, setNameUser] = useState('');
  //* Modals
  const [openModalGreeting, setOpenModalGreeting] = useState(true);
  const [modalQuestion, setModalQuestion] = useState(false);
  const [modalAlreadyExists, setModalAlreadyExists] = useState(false);
  const [modalWasPrevious, setModalWasPrevious] = useState(false);
  const [modalGameOver, setModalGameOver] = useState(false);
  //* Letters
  const [letterGuess, setLetterGuess] = useState([]);
  const [letterNo, setLetterNo] = useState([]);
  //* правильная ли введена буква
  const [correctGuess, isCorrectGuess] = useState(false);
  const [correctNo, isCorrectNo] = useState(false);

  //* Step
  const [step, setStep] = useState(0);
  let nextWord = words[step];

  const [nextWordObj, setNextWordObj] = useState({
    wordWord: nextWord.word,
    wordTitle: nextWord.title,
    letterAnswerArray: nextWord.word.split(''),
    letter$: Array(nextWord.word.split('').length).fill('⚽'),
  });

  const onClickInputValue = (e) => {
    let val = e.target.value;
    val = val.replace(/[^А-Яа-яЁё]/gi, '');
    setLetterInput(val);
    isCorrectNo(false);
    isCorrectGuess(false);
  };

  const onNameUser = (e) => {
    setNameUser(e.target.value);
  };

  const handleopenModalGreeting = () => {
    setOpenModalGreeting(false);
    setStep((prev) => prev + 1);
  };
  const openModalQuestion = () => {
    setModalQuestion(true);
  };

  const openModalAlreadyExists = () => {
    setModalAlreadyExists(true);
    setModalQuestion(false);
  };

  const openModalWasPrevious = () => {
    setModalWasPrevious(true);
  };

  //* Start Game
  const onAddedLetterGuess = () => {
    let g = letterInput.trim().toLowerCase().toString();

    if (nextWordObj.letterAnswerArray.includes(g)) {
      const newWord = nextWordObj.letter$.map((letter, index) =>
        nextWordObj.letterAnswerArray[index] === g ? g : letter
      );
      openModalQuestion();
      setNextWordObj((prev) => ({ ...prev, letter$: newWord }));

      if (letterGuess.includes(g)) {
        openModalAlreadyExists();
      } else {
        isCorrectGuess(true);
        setLetterGuess([...letterGuess, g]);
      }
    } else {
      if (letterNo.includes(g)) {
        openModalWasPrevious();
      } else {
        openModalQuestion();
        isCorrectNo(true);
        setLetterNo([...letterNo, g]);
      }
    }
    setLetterInput('');
  };

  useEffect(() => {
    const isComplete = nextWordObj.letter$.every((el) => el !== '⚽');
    if (isComplete) {
      setModalQuestion(false);
      setModalGameOver(true);
    }
  }, [nextWordObj.letter$]);

  //* start NewGame
  const startNewGame = () => {
    setModalGameOver(false);
    setOpenModalGreeting(false);
    setStep((prev) => prev + 1);

    setNextWordObj({
      wordWord: nextWord.word,
      wordTitle: nextWord.title,
      letterAnswerArray: nextWord.word.split(''),
      letter$: Array(nextWord.word.split('').length).fill('⚽'),
    });

    setLetterGuess([]);
    setLetterNo([]);
    setLetterInput('');
  };
  //* finish NewGame
  return (
    <div className='App'>
      <div id='warning'>
        <div className='warning-inner'>
          <span className='warning-title'>
            Переверни экран! Так удобнее играть!
          </span>
          <span className='warning-img'>🔄</span>
        </div>
      </div>
      {openModalGreeting && (
        <ModalGreeting
          openModalGreeting={openModalGreeting}
          handleopenModalGreeting={handleopenModalGreeting}
          nameUser={nameUser}
          onNameUser={onNameUser}
        />
      )}
      {modalQuestion && (
        <ModalQuestionUser setModalQuestion={setModalQuestion} />
      )}
      {modalAlreadyExists && (
        <ModalAlreadyExistsUser setModalAlreadyExists={setModalAlreadyExists} />
      )}
      {modalWasPrevious && (
        <ModalWasPreviousUser setModalWasPrevious={setModalWasPrevious} />
      )}
      {modalGameOver && (
        <ModalGameOverFinish
          startNewGame={startNewGame}
          nameUser={nameUser}
          word={nextWordObj.wordWord}
          letterGuess={letterGuess}
          letterNo={letterNo}
          words={words}
          step={step}
        />
      )}

      {!openModalGreeting && (
        <>
          <Header />
          <WordTask
            letter$={nextWordObj.letter$}
            title={nextWordObj.wordTitle}
          />
          <Score
            letterGuess={letterGuess}
            letterNo={letterNo}
            nameUser={nameUser}
            correctGuess={correctGuess}
            correctNo={correctNo}
          />
          <FormLetter
            letterInput={letterInput}
            onClickInputValue={onClickInputValue}
            onAddedLetterGuess={onAddedLetterGuess}
            letterGuess={letterGuess}
            letter$={nextWordObj.letter$}
          />
        </>
      )}
    </div>
  );
}

export default App;
