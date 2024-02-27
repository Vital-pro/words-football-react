import React from 'react'

export const ModalWasPreviousUser = ({
  setModalWasPrevious
}) => {
  return (
    <div className='overlay overlay-user overlay-message'>
      <div className='modal modal-user modal-message'>
        <p className='modal-user-text'>Уже вводил такую букву!</p>
        <button
          className='modal-user-btn'
          onClick={() => setModalWasPrevious(false)}
        >
          Жми дальше
        </button>
      </div>
    </div>
  );
};
