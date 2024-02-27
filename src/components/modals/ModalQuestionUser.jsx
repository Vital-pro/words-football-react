import React from 'react';

export const ModalQuestionUser = ({ setModalQuestion }) => {
  return (
    <div className='overlay overlay-user'>
      <div className='modal modal-user'>
        <p className='modal-user-text'>
          Г о ⚽ о л !! <br />
          <span className='modal-user-goal'>Красава!!</span>
          <span className='modal-user-goal'>Кто забил..?</span>
        </p>
        <div className='modal-user-box'>
          <button
            className='modal-user-btn'
            onClick={() => setModalQuestion(false)}
          >
            Продолжаем?
          </button>
          <a className='modal-user-exit-link' href='/'>Закончить игру</a>
        </div>
      </div>
    </div>
  );
};
