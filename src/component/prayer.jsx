import React from 'react';

const Prayer = ({ name, time }) => {
  return (
    <div className='prayer'>
        <p className='name-pro'>{name}</p>  
        <p className='time-pro'>{time}</p>  
    </div>
  );
}

export default Prayer;
