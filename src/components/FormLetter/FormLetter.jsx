import React, { memo } from 'react';

export const FormLetter = memo(
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
