import React from 'react';
import './dropdown.css';

const Dropdown = ({ options, focusedIndex, onMouseOver, onMouseOut, setRef, onSelectItem }) => (
  <div className='dd-container'>

    <div className='triangle-up'/>

    <div className='dropdown'>
      {
        options.map((item, i) =>
          <Item
            key={item.id}
            item={item}
            i={i}
            focusedIndex={focusedIndex}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            setRef={setRef}
            onSelectItem={onSelectItem}
          />
        )
      }
    </div>

  </div>
)

const Item = ({ item, i, onMouseOver, onMouseOut, setRef, focusedIndex, onSelectItem }) => (
  <div
    onMouseOver={(e) => onMouseOver(e, i)}
    onMouseOut={onMouseOut}
    ref={(ref) => setRef(ref, i)}
    className={`${focusedIndex === i ? 'active' : ''} ${item.id === null ? 'disabled' : ''}`}>
    <div
      className={'dropdown-text'}
      onClick={() => onSelectItem(item, i)}>
      {item.name}
    </div>
  </div>
)

export default Dropdown