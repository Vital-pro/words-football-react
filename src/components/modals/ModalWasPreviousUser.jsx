import React from 'react'

export const ModalWasPreviousUser = ({
  setModalWasPrevious,
  openModalWasPrevious,
}) => {
  return (
      <div className='overlay overlay-user'>
        <div className='modal modal-user'>
          ModalWasPreviousUser
          <p className='modal-user-text'>Уже вводил такую букву!</p>
          <button onClick={() => setModalWasPrevious(false)}>Жми дальше</button>
        </div>
      </div>
  );
};
