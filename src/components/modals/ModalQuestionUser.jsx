import React from 'react'

export const ModalQuestionUser = ({ openModalQuestion, setModalQuestion }) => {
  return (
    <div className='overlay overlay-user'>
      <div className='modal modal-user'>
        ModalQuestionUser
        <p className='modal-user-text'>
          Г о о ⚽ л!! <br /> Один из нас - красава!!
        </p>
        <button onClick={() => setModalQuestion(false)}>Продолжаем!</button>
      </div>
    </div>
  );
};
