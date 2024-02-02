import React from 'react'

export const ModalGameOverFinish = () => {
  return (
    <div className='overlay overlay-user overlay-success'>
      <div className='modal modal-user modal-success'>
        {/* ModalGameOverFinish */}
        <p className='modal-user-text'>Success!!</p>
        <button>Продолжаем?</button>
        <a href='/'>Выход из игры</a>
      </div>
    </div>
  );
};
