import React from 'react';

export const ModalQuestionUser = ({ openModalQuestion, setModalQuestion }) => {
  return (
    <div className='overlay overlay-user'>
      <div className='modal modal-user'>
        {/* ModalQuestionUser */}
        <p className='modal-user-text'>
          Г о ⚽ о л !! <br />
          <span className='modal-user-goal'>Красава!!</span>
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
