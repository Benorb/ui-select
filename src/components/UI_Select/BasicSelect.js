import React from 'react';
import './BasicSelect.css';

// Basic select - chosen text and arrow up / down.
const BasicSelect = ({options, arrowDirection, selectedId, onClick}) => {
  return (
    <div className='select' onClick={onClick}>
      <div className='text'>
        {options.find((item) => item.id === selectedId).name}
      </div>
      <div className={arrowDirection}/>
    </div>
  );
}

export default BasicSelect;