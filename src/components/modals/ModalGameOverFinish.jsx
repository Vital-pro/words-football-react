import React from 'react';

export const ModalGameOverFinish = ({
  startNewGame,
  nameUser,
  word,
  letterGuess,
  letterNo,
}) => {
  console.log(nameUser);
  return (
    <div className='overlay overlay-user overlay-success'>
      <div className='modal modal-user modal-success'>
        {letterGuess.length === letterNo.length && (
          <>
            <p className='overlay-success-name'>{nameUser}!</p>
            <p className='overlay-success-text'>Ничья! Мощная была битва!</p>
            <p className='overlay-success-text'>
              Загаданное слово <br />
              {word}
            </p>
          </>
        )}

        {letterGuess.length > letterNo.length && (
          <>
            <p className='overlay-success-name'>{nameUser}!</p>
            <p className='overlay-success-text'>Поздравляю с победой!</p>
            <p className='overlay-success-text'>
              Ты угадал слово <br />
              {word}
            </p>
          </>
        )}

        {letterGuess.length < letterNo.length && (
          <>
            <p className='overlay-success-name'>{nameUser}!</p>
            <p className='overlay-success-text'>В этот раз победил я!</p>
            <p className='overlay-success-text'>
              Загаданное слово <br />
              {word}
            </p>
          </>
        )}

        <div className='modal-user-box'>
          <button className='modal-user-btn' onClick={startNewGame}>
            Ещё играем?
          </button>
          <a className='modal-user-exit-link' href='/'>
            Закончить игру
          </a>
        </div>
      </div>
    </div>
  );
};

// Ничья! Мощная была битва!

// Поздравляю! Ты победил!
// Загаданное слово {word}

// В этот раз победил я!
// Загаданное слово {word}
