// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

import words from './data/db.words.json';

import { ModalGreeting } from './components/modals/ModalGreeting';
import { ModalQuestionUser } from './components/modals/ModalQuestionUser';
import { ModalAlreadyExistsUser } from './components/modals/ModalAlreadyExistsUser';
import { ModalWasPreviousUser } from './components/modals/ModalWasPreviousUser';
import { ModalGameOverFinish } from './components/modals/ModalGameOverFinish';

function pickWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}
//* object с описанием - title и словом-word
let wordObj = pickWord(words);
let wordObjDescroption = wordObj.title; //* word description
let word = wordObj.word; //* word
let letterAnswerArray = word.split(''); //* arrayWord
//? ниже два разных варианта заполнения массива с '?' вместо букв
// let letterArray$ = letterAnswerArray.map((item) => (item = '?'));
let letterArray$ = Array(letterAnswerArray.length).fill('⚽');

const Header = () => {
  return (
    <div className='Header'>
      <h1>Guess the word!</h1>
      <p>
        Начинаем игру! Прочитай описание самого слова и вводи букву в нужное
        поле. Если угадал верно, значит забил гол! Угаданная буква откроется в
        слове, и счет на табло изменится. Если введешь неверную букву, это
        значит, я забил гол в твои ворота. Когда все попытки будут использованы,
        увидим, кто победил. Итоговый счет будет на табло! Желаю удачи!
      </p>
    </div>
  );
};

const WordTask = ({ letter$ }) => {
  console.log('props.letter$==>>', letter$);

  return (
    <div className='WordTask'>
      <p>{`${wordObjDescroption}: ${word}`}</p>
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
  // isCorrectNo,
  // isCorrectGuess,
  correctGuess,
  correctNo,
}) => {
  return (
    <div className='Score'>
      {/* <div className='inner'> */}
      <div className='itemLetters itemLetters-user'>{letterGuess}</div>
      <div className='itemLetters itemLetters-comp'>{letterNo}</div>
      {/* <img src='https://js.cx/clipart/ball.svg' /> */}
      {/* </div> */}
      <div className='inner'>
        <div className={`item item-score ${correctGuess ? 'd' : ''}`}>
          {letterGuess.length}
        </div>
        <div className={`item item-score ${correctNo ? 'd' : ''}`}>
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

const FormLetter = ({
  letterInput,
  onClickInputValue,
  onAddedLetterGuess,
  letterGuess,
}) => {
  return (
    <div className='FormLetter'>
      {/* <form onClick={onAddedLetterGuess}> */}
      <label htmlFor='letter'>
        Введи букву
        <input
          autoFocus
          disabled={letterArray$.length === letterGuess.length}
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
      {/* </form> */}
    </div>
  );
};

// function pickWord(words) {
//   return words[Math.floor(Math.random() * words.length)];
// }
// //* object с описанием - title и словом-word
// let word = pickWord(words);
// let wordObjDescroption = word.title; //* word description
// let word = word.word; //* word
// let letterAnswerArray = word.word.split(''); //* arrayWord
// let letterArray$ = letterAnswerArray.map((item) => (item = '?'));

function App() {
  //* управляемыe inputs
  const [letterInput, setLetterInput] = useState('');
  const [nameUser, setNameUser] = useState('');
  //* Modals
  const [openModalGreeting, setOpenModalGreeting] = useState(true);
  const [modalQuestion, setModalQuestion] = useState(false);
  const [modalAlreadyExists, setModalAlreadyExists] = useState(false);
  const [modalWasPrevious, setModalWasPrevious] = useState(false);
  const [modalGameOver, setModalGameOver] = useState(false);

  const [letter$, setLetter$] = useState(letterArray$);
  const [letterGuess, setLetterGuess] = useState([]);
  const [letterNo, setLetterNo] = useState([]);
  //* правильная ли введена буква
  const [correctGuess, isCorrectGuess] = useState(false);
  const [correctNo, isCorrectNo] = useState(false);
  // const [autoFocusState, setAutoFocusState] = useState(false);

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

  const openModalGameOver = () => {
    setModalGameOver(true);
  };

  //* Start Game
  const onAddedLetterGuess = () => {
    let g = letterInput.trim().toLowerCase().toString();
    console.log(g);

    if (letterAnswerArray.includes(g)) {
      const newWord = letter$.map((letter, index) =>
        letterAnswerArray[index] === g ? g : letter
      );
      // alert('Гооол! Кто забил?)');
      openModalQuestion();
      setLetter$(newWord);

      if (letterGuess.includes(g)) {
        // alert('Такая буква уже есть!!');
        openModalAlreadyExists();
      } else {
        isCorrectGuess(true);
        setLetterGuess([...letterGuess, g]);
      }
    } else {
      if (letterNo.includes(g)) {
        // alert('Такая буква уже была!!');
        openModalWasPrevious();
      } else {
        // alert('Гооол! Кто забил?)');
        openModalQuestion();
        isCorrectNo(true);
        setLetterNo([...letterNo, g]);
      }
    }
    setLetterInput('');
  };

  //! Два разных варианта START
  // useEffect(() => {
  //   const isComp = letter$.every(
  //     (el, index) => el === letterAnswerArray[index]
  //   );
  //   if (isComp) {
  //     setTimeout(() => {
  //       alert('Успешно!');
  //     }, 0);
  //   }
  // }, [letter$, letterAnswerArray]);
  useEffect(() => {
    const isComplete = letter$.every((el) => el !== '⚽');
    if (isComplete) {
      setTimeout(() => {
        // alert('Success!');
        setModalQuestion(false);
        openModalGameOver();
      }, 800);
    }
  }, [letter$]);
  //! Два разных варианта FINISH

  // useEffect(() => {
  //   openModalQuestion();
  // }, [letterGuess, letterNo]);

  console.log(letterAnswerArray);
  console.log('letter$==>>', letter$);
  console.log(letterGuess);
  console.log(letterNo);

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
      {/* {openModalGreeting && (
        <ModalGreeting
          openModalGreeting={openModalGreeting}
          setOpenModalGreeting={setOpenModalGreeting}
          nameUser={nameUser}
          onNameUser={onNameUser}
        />
      )} */}
      {modalQuestion && (
        <ModalQuestionUser
          openModalQuestion={openModalQuestion}
          setModalQuestion={setModalQuestion}
        />
      )}
      {modalAlreadyExists && (
        <ModalAlreadyExistsUser
          openModalAlreadyExists={openModalAlreadyExists}
          setModalAlreadyExists={setModalAlreadyExists}
        />
      )}
      {modalWasPrevious && (
        <ModalWasPreviousUser
          openModalWasPrevious={openModalWasPrevious}
          setModalWasPrevious={setModalWasPrevious}
        />
      )}
      {modalGameOver && <ModalGameOverFinish />}

      <Header />
      <WordTask letter$={letter$} />
      <Score
        nameUser={nameUser}
        letterGuess={letterGuess}
        letterNo={letterNo}
        correctGuess={correctGuess}
        correctNo={correctNo}
      />
      <FormLetter
        letterInput={letterInput}
        onClickInputValue={onClickInputValue}
        onAddedLetterGuess={onAddedLetterGuess}
        letterGuess={letterGuess}
      />
    </div>
  );
}

export default App;
