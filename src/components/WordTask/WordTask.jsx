import React from 'react'

export const WordTask = ({ letter$, title }) => {
  return (
    <div className='WordTask'>
      <p>{`${title}`}</p>
      <ul className='list'>
        {letter$.map((item, index) => (
          <li className='item item-word' key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};