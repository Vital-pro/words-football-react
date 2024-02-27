import React from 'react';

export const ModalGameOverFinish = ({
  startNewGame,
  nameUser,
  word,
  letterGuess,
  letterNo,
  words,
  step,
}) => {
  return (
    <div className='overlay overlay-user overlay-success'>
      <div className='modal modal-user modal-success'>
        {letterGuess.length === letterNo.length &&
          step !== words.length - 1 && (
            <>
              <p className='overlay-success-name'>{nameUser}!</p>
              <p className='overlay-success-text'>Ничья! Мощная была битва!</p>
              <p className='overlay-success-text'>
                Загаданное слово <br />
                {word}
              </p>
            </>
          )}

        {letterGuess.length > letterNo.length && step !== words.length - 1 && (
          <>
            <p className='overlay-success-name'>{nameUser}!</p>
            <p className='overlay-success-text'>Поздравляю с победой!</p>
            <p className='overlay-success-text'>
              Ты угадал слово <br />
              {word}
            </p>
          </>
        )}

        {letterGuess.length < letterNo.length && step !== words.length - 1 && (
          <>
            <p className='overlay-success-name'>{nameUser}!</p>
            <p className='overlay-success-text'>В этот раз победил я!</p>
            <p className='overlay-success-text'>
              Загаданное слово <br />
              {word}
            </p>
          </>
        )}

        {step === words.length - 1 && (
          <>
            <p className='overlay-success-name'>{nameUser}!</p>
            <p className='overlay-success-text'>В этом тайме ты - лидер!</p>
            <p className='overlay-success-text'>
              Идём на другой уровень <br />
              или перерыв?
            </p>
          </>
        )}
        <div className='modal-user-box'>
          {step !== words.length - 1 ? (
            <>
              <button className='modal-user-btn' onClick={startNewGame}>
                Ещё играем?
              </button>
              <a className='modal-user-exit-link' href='/'>
                Закончить игру
              </a>
            </>
          ) : (
            <>
              <a
                className='modal-user-exit-link'
                style={{ background: '#00bcd4' }}
                href='/'
              >
                Следующий уровень
              </a>
              <a className='modal-user-exit-link' href='/'>
                Закончить игру
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
