import React from 'react'

export const ModalAlreadyExistsUser = ({ setModalAlreadyExists }) => {
  return (
    <div className='overlay overlay-user overlay-message'>
      <div className='modal modal-user modal-message'>
        <p className='modal-user-text'>Такая буква уже есть!</p>
        <button
          className='modal-user-btn'
          onClick={() => setModalAlreadyExists(false)}
        >
          Жми дальше
        </button>
      </div>
    </div>
  );
};
