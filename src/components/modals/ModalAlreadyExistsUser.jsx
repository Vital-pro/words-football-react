import React from 'react'

export const ModalAlreadyExistsUser = ({
  openModalAlreadyExists, setModalAlreadyExists,
}) => {
  return (
      <div className='overlay overlay-user'>
        <div className='modal modal-user'>
          <p className='modal-user-text'>Такая буква уже есть!</p>
          ModalAlreadyExistsUser
          <button onClick={() => setModalAlreadyExists(false)}>Жми дальше</button>
        </div>
      </div>
  );
};
