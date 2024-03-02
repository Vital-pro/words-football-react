import React from 'react'

export const Score = ({
  letterGuess,
  letterNo,
  nameUser,
  correctGuess,
  correctNo,
}) => {
  return (
    <div className='Score'>
      <div className='itemLetters itemLetters-user'>{letterGuess}</div>
      <div className='itemLetters itemLetters-comp'>{letterNo}</div>
      <div className='inner'>
        <div className={`item item-score ${correctGuess ? 'goal' : ''}`}>
          {letterGuess.length}
        </div>
        <div className={`item item-score ${correctNo ? 'goal' : ''}`}>
          {letterNo.length}
        </div>
      </div>
      <div className='gamers-inner'>
        <p className='gamers-user'>{nameUser}</p>
        <p className='gamers-comp'>Сл⚽варик</p>
      </div>
    </div>
  );
};