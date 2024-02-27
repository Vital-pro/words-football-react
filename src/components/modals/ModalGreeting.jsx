import React from 'react';

export const ModalGreeting = ({
  openModalGreeting,
  handleopenModalGreeting,
  nameUser,
  onNameUser,
}) => {
  return (
    <div
      className='overlay-greeting'
      style={{ display: `${openModalGreeting ? '' : 'none'}` }}
    >
      <div className='modal'>
        <p className='modal-title'>
          <span className='title-hi'>Привет!!</span>Я
          <span className='title-comp-name'> Сл⚽варик!</span>
        </p>
        <p className='modal-text'>
          Поиграем в весёлый <br /> словарный футбол? ⚽
        </p>
        <p className='modal-text'>Я загадаю слово, а ты угадай его!</p>
        <label>
          <input
            value={nameUser}
            onChange={onNameUser}
            type='text'
            placeholder='Напиши, как тебя зовут?'
            maxLength={10}
          />
        </label>
        <button
          className='modal-btn'
          disabled={!nameUser.length}
          onClick={handleopenModalGreeting}
        >
          Начинаем!
        </button>
      </div>
    </div>
  );
};
