import React from 'react'

export const ModalGameOverFinish = ({ startNewGame }) => {
  return (
    <div className='overlay overlay-user overlay-success'>
      <div className='modal modal-user modal-success'>
        {/* ModalGameOverFinish */}
        <p className='modal-user-text'>Success!!</p>

        {/* <button onClick={startNewGame}>Продолжаем?</button>
        <a href='/'>Выход из игры</a> */}

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
