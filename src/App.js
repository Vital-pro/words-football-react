// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

import words from './data/db.words.json';

import { ModalGreeting } from './components/modals/ModalGreeting';
import { ModalQuestionUser } from './components/modals/ModalQuestionUser';
import { ModalAlreadyExistsUser } from './components/modals/ModalAlreadyExistsUser';
import { ModalWasPreviousUser } from './components/modals/ModalWasPreviousUser';
import { ModalGameOverFinish } from './components/modals/ModalGameOverFinish';

//! after finish Game Delete!
// function pickWord(words) {
//   return words[Math.floor(Math.random() * words.length)];
// }
// //* object с описанием - title и словом-word
// let wordObj = pickWord(words);
// let wordObjDescription = wordObj.title; //* word description
// let word = wordObj.word; //* word
// let letterAnswerArray = word.split(''); //* arrayWord
// //? ниже два разных варианта заполнения массива с '?' вместо букв
// // let letterArray$ = letterAnswerArray.map((item) => (item = '?'));
// let letterArray$ = Array(letterAnswerArray.length).fill('⚽');

const Header = () => {
  return (
    <div className='Header'>
      <h1>Угадай слово!</h1>
      <p>
        Начинаем игру в словарный футбол! Прочитай описание самого слова и вводи букву в нужное
        поле. Если угадал верно, значит забил гол! Угаданная буква откроется в
        слове, и счет на табло изменится. Если введешь неверную букву, это
        значит, я забил гол в твои ворота. Когда все попытки будут использованы,
        увидим, кто победил. Итоговый счет будет на табло! Желаю удачи!
      </p>
    </div>
  );
};

const WordTask = ({ letter$, wordObjDescription, word }) => {
  return (
    <div className='WordTask'>
      <p>{`${wordObjDescription}`}</p>
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

const FormLetter = ({
  letterInput,
  onClickInputValue,
  onAddedLetterGuess,
  letterGuess,
  letterArray$,
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
// let wordObjDescription = word.title; //* word description
// let word = word.word; //* word
// let letterAnswerArray = word.word.split(''); //* arrayWord
// let letterArray$ = letterAnswerArray.map((item) => (item = '?'));

function App() {
  function pickWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }

function createLetterArray$(word) {
  console.log(word);
  let wordSplit = word.split('');
  console.log(wordSplit)
  const letterArray$ = Array(wordSplit.length).fill('⚽');
  console.log(letterArray$);
  return letterArray$;
}

  const [wordObj, setWordObj] = useState(pickWord(words));
  const [wordObjDescription, setwordObjDescription] = useState(wordObj.title);
  const [word, setWord] = useState(wordObj.word);
  
  // let wordObj = pickWord(words); //* object с описанием - title и словом-word
  // let wordObjDescription = wordObj.title; //* word description
  // let word = wordObj.word; //* word

  //?
  const [letterAnswerArray, setLetterAnswerArray] = useState(word.split(''));
  const [letterArray$, setLetterArray$] = useState(createLetterArray$(word));
  //?

  // let letterAnswerArray = word.split(''); //* arrayWord
  //? ниже два разных варианта заполнения массива с '?' вместо букв
  // let letterArray$ = letterAnswerArray.map((item) => (item = '?'));
  // let letterArray$ = Array(letterAnswerArray.length).fill('⚽');

  
  
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
  const [letter$, setLetter$] = useState(createLetterArray$(word));
  const [letterGuess, setLetterGuess] = useState([]);
  const [letterNo, setLetterNo] = useState([]);
  //* правильная ли введена буква
  const [correctGuess, isCorrectGuess] = useState(false);
  const [correctNo, isCorrectNo] = useState(false);

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
    // openModalQuestion();

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
      const timeoutModalId = setTimeout(() => {
        // alert('Success!');
        setModalQuestion(false);
        openModalGameOver();
      }, 800);

      return () => {
        clearTimeout(timeoutModalId);
      };
    }
  }, [letter$]);
  //! Два разных варианта FINISH

  //! start NewGame
  const startNewGame = () => {
    setModalGameOver(false);
    setOpenModalGreeting(false);
    
    setWordObj(pickWord(words));
    setwordObjDescription(wordObj.title);
    setWord(wordObj.word);

    setLetterAnswerArray(wordObj.word.split(''));

    setLetterArray$(createLetterArray$(wordObj.word));
    setLetter$(createLetterArray$(wordObj.word));


    setLetterGuess([]);
    setLetterNo([]);
    setLetterInput('');

    console.log(wordObj);
    console.log(wordObjDescription)
    console.log(word, wordObj.word);
    console.log(letterAnswerArray);
    console.log(letter$)
    console.log(letterArray$)
    
  };
  //! finish NewGame

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
      {openModalGreeting && (
        <ModalGreeting
          openModalGreeting={openModalGreeting}
          setOpenModalGreeting={setOpenModalGreeting}
          nameUser={nameUser}
          onNameUser={onNameUser}
        />
      )}
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
      {modalGameOver && (
        <ModalGameOverFinish startNewGame={startNewGame} nameUser={nameUser}
        word={word}
        letterGuess={letterGuess}
        letterNo={letterNo} />
      )}

      {!openModalGreeting && (
        <>
          <Header />
          <WordTask
            letter$={letter$}
            wordObjDescription={wordObjDescription}
            word={word}
          />
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
            letterArray$={letterArray$}
          />
        </>
      )}
    </div>
  );
}

export default App;
