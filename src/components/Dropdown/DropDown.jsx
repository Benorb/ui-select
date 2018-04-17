import React from 'react';
import './Dropdown.css';

const Dropdown = ({ options, filter, focusedIndex, onMouseOver, onMouseOut, setRef, onSelectItem }) => {

  options = options.filter(item => item.name.indexOf(filter) !== -1);

  return (
    <div className='dd-container'>

      <div className='triangle-up'/>

      {/*This borders are for the "empty" space that in the bottom of the triangle*/}
      <div className='border-top-left'/>
      <div className='border-top-right'/>

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
              onClick={onSelectItem}
            />
          )
        }

        {/*If there is no item found on the search*/}
        {options.length === 0 && <Item
          key={'noResults'}
          item={{ id: null, name: 'לא נמצאו תוצאות' }}
          i={0}
        />}
      </div>

    </div>
  )
}

const Item = ({item, i, onMouseOver, onMouseOut, setRef, focusedIndex, onClick}) => (
  <div
    onMouseOver={(e) => onMouseOver && onMouseOver(e, i)}
    onMouseOut={onMouseOut}
    ref={(ref) => setRef && setRef(ref, i)}
    className={`${focusedIndex === i ? 'active' : ''} ${item.id === null ? 'disabled' : ''}`}>
    <div
      className={'dropdown-text'}
      onClick={() => onClick && onClick(item, i)}>
      {item.name}
    </div>
  </div>
)

export default Dropdown;