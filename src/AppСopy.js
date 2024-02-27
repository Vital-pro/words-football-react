import React, { useEffect, useState, memo } from 'react';
import './App.css';

import words from './data/db.words.json';

import { ModalGreeting } from './components/modals/ModalGreeting';
import { ModalQuestionUser } from './components/modals/ModalQuestionUser';
import { ModalAlreadyExistsUser } from './components/modals/ModalAlreadyExistsUser';
import { ModalWasPreviousUser } from './components/modals/ModalWasPreviousUser';
import { ModalGameOverFinish } from './components/modals/ModalGameOverFinish';

const Header = memo(() => {
  console.log('HEADER');
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
  wordObjDescription,
  title,
  word,
  letterAnswerArray,
}) => {
  console.log('WordTASK')
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
  console.log('SCORE')
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

const FormLetter = memo(({
  letterInput,
  onClickInputValue,
  onAddedLetterGuess,
  letterGuess,
  letterArray$,
  letter$,
}) => {
  console.log('FORMLETTER')
  return (
    <div className='FormLetter'>
      <label htmlFor='letter'>
        Введи букву
        <input
          autoFocus
          disabled={letter$?.length === letterGuess.length}
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
});

function App() {
  // function pickWord() {
  //   return words[Math.floor(Math.random() * words.length)];
  // }
  console.log('words-----------=>', words);


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
  // const letter$ = Array(nextWord.word.length).fill('⚽');
  const [letterGuess, setLetterGuess] = useState([]);
  const [letterNo, setLetterNo] = useState([]);
  //* правильная ли введена буква
  const [correctGuess, isCorrectGuess] = useState(false);
  const [correctNo, isCorrectNo] = useState(false);
  
  //* Step
  const [step, setStep] = useState(0);
  // const [nextWord, setNextWord] = useState(words[step]);
  let nextWord = words[step];
  // const [wordWord, setWordWord] = useState(nextWord.word);
  // let wordWord = nextWord.word;
  // const [wordTitle, setWordWordTitle] = useState(nextWord.title);
  // let wordTitle = nextWord.title;
  // const [letterAnswerArray, setLetterAnswerArray] = useState(
  //   wordWord.split('')
  // );
  //!
  // let letterAnswerArray = wordWord.split('');
  // const [letter$, setLetter$] = useState(
  //   // Array(letterAnswerArray.length).fill('⚽')
  //   letterAnswerArray.map((el) => (el = '⚽'))
  // );
    // const [letterArray$, setLetterArray$] = useState(letterAnswerArray);
  //!

  const [first, setFirst] = useState({
    // words: words,
    // step: 0,
    // nextWord: words[step],
    wordWord: nextWord.word,
    wordTitle: nextWord.title,
    letterAnswerArray: nextWord.word.split(''),
    letter$: Array(nextWord.word.split('').length).fill('⚽'),
    // letterArray$: letterAnswerArray
  });

  useEffect(() => {}, [])
  console.log(first)
  // let letterAnswerArray = wordWord.split(''); //слово разобрали, превартили в масссив
  // console.log('letterAnswerArray-->', letterAnswerArray);
  
  // function getArrFootWord() {
  //   return letterAnswerArray;
  // }
  // function getArrFoot() {
  //   return Array(letterAnswerArray.length).fill('⚽')
  // }
  
  // const [letter$, setLetter$] = useState(getArrFoot());
  // const [letterArray$, setLetterArray$] = useState(getArrFootWord());
  
  
  // const [letter$, setLetter$] = useState(
  //   Array(letterAnswerArray.length).fill('⚽')
  // );
  // const [letterArray$, setLetterArray$] = useState(letterAnswerArray);


  // function createLetterArray$(wordWord, step) {
  //   // console.log(wordWord);
  //   let wordSplit = wordWord.split('');
  //   // console.log(wordSplit);
  //   const letterArray$ = Array(wordSplit.length).fill('⚽');
  //   // console.log(letterArray$);
  //   return letterArray$;
  // }
  // console.log('letterArray$: ', letterArray$);

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
    setStep((prev) => prev + 1)
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

    if (first.letterAnswerArray.includes(g)) {
      const newWord = first.letter$.map((letter, index) =>
        first.letterAnswerArray[index] === g ? g : letter
      );
      openModalQuestion();
      // setLetter$(newWord);
      setFirst((prev) => ({...prev, letter$: newWord}))

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
    const isComplete = first.letter$.every((el) => el !== '⚽');
    if (isComplete) {
      // const timeoutModalId = setTimeout(() => {
        setModalQuestion(false);
        // openModalGameOver();
        setModalGameOver(true)
      // }, 600);

      // return () => {
      //   clearTimeout(timeoutModalId);
      // };
    }
  }, [first.letter$]);

  //! start NewGame
  const startNewGame = () => {
    setModalGameOver(false);
    // openModalGameOver();
    setOpenModalGreeting(false);
    // handleopenModalGreeting();
    setStep((prev) => prev + 1);

    // setNextWord(words[step]);
    // setWordWordTitle(nextWord.title);
    // setWordWord(nextWord.word);
    // setLetterAnswerArray(wordWord.split(''));
    // setLetter$(letterAnswerArray.map((el) => (el = '⚽'))); //!
    setFirst({
      wordWord: nextWord.word,
      wordTitle: nextWord.title,
      letterAnswerArray: nextWord.word.split(''),
      letter$: Array(nextWord.word.split('').length).fill('⚽'),
    });
    // setLetterArray$(letterAnswerArray);


    // setLetterArray$(letterAnswerArray);
    // setLetter$(Array(letterAnswerArray.length).fill('⚽'));

    // setLetterArray$(Array(letterAnswerArray.length).fill('⚽'));
    // setLetter$(letterArray$);

  //   // setWordObj(nextWord);
  //   // setWordObj(pickWord());
  //   // setwordObjDescription(nextWord.title);
  //   // setWord(nextWord.word);

  //   // setLetterAnswerArray(nextWord.word.split(''));

  //   // setLetterArray$(createLetterArray$(nextWord.wordObj.word));
  //   // setLetter$(createLetterArray$(nextWord.wordObj.word));

  //   setLetter$(Array(letterAnswerArray.length).fill('⚽')); 

    setLetterGuess([]);
    setLetterNo([]);
  //   setLetterInput('');
  };
  //! finish NewGame

  console.log('nextWord: ', nextWord);
  console.log('nextWord.word: ', nextWord.word);
  console.log('letterAnswerArray=>', first.letterAnswerArray);
  console.log('letter$==>>', first.letter$);
  console.log('letterGuess=>', letterGuess);
  console.log('letterNo=>', letterNo);
  console.log('APP!')

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
          handleopenModalGreeting={handleopenModalGreeting}
          nameUser={nameUser}
          onNameUser={onNameUser}
          startNewGame={startNewGame}
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
        <ModalGameOverFinish
          startNewGame={startNewGame}
          nameUser={nameUser}
          word={first.wordWord}
          letterGuess={letterGuess}
          letterNo={letterNo}
        />
      )}

      {!openModalGreeting && (
        <>
          <Header />
          <WordTask
            letter$={first.letter$}
            // wordObjDescription={wordObjDescription}
            // word={word}
            title={first.wordTitle}
            word={first.wordWord}
            letterAnswerArray={first.letterAnswerArray}
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
            // letterArray$={letterArray$}
            // letter$={letter$}
          />
        </>
      )}
    </div>
  );
}

export default App;
