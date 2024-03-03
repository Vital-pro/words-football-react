import React, { useEffect, useState } from 'react';
import './App.css';

import words from './data/db.words.json';

import { ModalGreeting } from './components/modals/ModalGreeting';
import { ModalQuestionUser } from './components/modals/ModalQuestionUser';
import { ModalAlreadyExistsUser } from './components/modals/ModalAlreadyExistsUser';
import { ModalWasPreviousUser } from './components/modals/ModalWasPreviousUser';
import { ModalGameOverFinish } from './components/modals/ModalGameOverFinish';

import { Header } from './components/Header/Header';
import { WordTask } from './components/WordTask/WordTask';
import { Score } from './components/Score/Score';
import { FormLetter } from './components/FormLetter/FormLetter';

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
            Переверни экран или растяни браузер в высоту. Так удобнее играть! 
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
