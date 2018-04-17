import React, { Component } from 'react';
import Dropdown from '../Dropdown/DropDown';
import BasicSelect from './BasicSelect';
import './UI.Select.css';

class UISelect extends Component {

  constructor(props) {
    super(props);

    this.refsArr = [];

    this.element = null;
    this.inputElement = null;

    this.state = {
      dropdownOpen: false,
      focusedIndex: null,
      selectedId: null,
      mouseControl: false
    };
  }

  componentDidMount() {
    this.element.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    this.element.removeEventListener('keydown', this.handleKeyDown, false);
  }

  // Pressing DOWN key when UIControl is closed will open the dropdown
  handleKeyDown = (e) => {
    this.inputElement.focus();
    var oldSearchValue = this.inputElement.value;

    setTimeout(() => {
      if (oldSearchValue !== this.inputElement.value) {
        this.openDropdown();
      }
    }, 10);
    //e.stopPropagation();
    //e.preventDefault();

    const { dropdownOpen } = this.state;

    if (e.keyCode === 40 && !dropdownOpen) {
      this.openDropdown();
    }

    if (dropdownOpen) {
      this.handleKeyboardNavigation(e);
    }
  }

  openDropdown = () => {
    this.setState({ dropdownOpen: true });
  }

  closeDropdown = () => {
    this.setState({ dropdownOpen: false });
  }

  handleKeyboardNavigation = (e) => {
    const { focusedIndex } = this.state;
    const { options } = this.props;

    switch (e.keyCode) {
      case 38: { // up arrow
        const newIndex = focusedIndex - 1;
        focusedIndex > 1 && this.setState({ focusedIndex: newIndex }, () => {
          this.scrollToIndex(newIndex);
        });
        break;
      }
      case 40: { // down arrow
        const newIndex = focusedIndex + 1;
        focusedIndex < options.length - 1 && this.setState({ focusedIndex: newIndex }, () => {
          this.scrollToIndex(newIndex);
        });
        break;
      }
      case 13: { // enter
        this.onSelectItem(options[focusedIndex], focusedIndex);
        break;
      }
      default:
        return
    }
  }

  scrollToIndex = (index) => {
    this.refsArr[index].scrollIntoView({ block: 'center', inline: 'nearest' });
  }

  onSelectItem = (item, i) => {
    console.log(item);
    this.setState({
      dropdownOpen: false,
      selectedId: item.id,
      focusedIndex: i
    });
  }

  toggleSelect = () => {
    const { dropdownOpen } = this.state;
    if (dropdownOpen) {
      // clear the focused index when the dropdown is about to be closed.
      this.clearFocusedIndex();
    } else {
      this.inputElement.value = '';
    }
    this.setState({ dropdownOpen: !dropdownOpen });
  }

  // Click outside control should close it (in case it open)
  // i used dropdownOpen && ... for the setState will happen only if the dropdown is opened.
  onBlur = () => {
    const { dropdownOpen } = this.state;
    dropdownOpen && this.closeDropdown();
  }

  onMouseOver = (e, i) => {
    this.setState({ focusedIndex: i });
  }

  onMouseOut = () => {
    this.clearFocusedIndex();
  }

  clearFocusedIndex = () => {
    this.setState({ focusedIndex: null });
  }

  setRef = (ref, i) => {
    this.refsArr[i] = ref;
  }

  render() {
    const { dropdownOpen, focusedIndex, selectedId } = this.state;
    const { options } = this.props;
    const arrowDirection = dropdownOpen ? 'arrow-up' : 'arrow-down';

    return (
      <div
        className='container'
        tabIndex={this.props.tabIndex}
        onBlur={this.onBlur}
        ref={el => this.element = el}>

        <input ref={el => this.inputElement = el} type='text' className='hidden-input'/>

        <BasicSelect
          options={options}
          arrowDirection={arrowDirection}
          selectedId={selectedId}
          onClick={this.toggleSelect}/>

        {
          dropdownOpen ?
            <Dropdown
              options={options}
              filter={this.inputElement.value}
              focusedIndex={focusedIndex}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
              setRef={this.setRef}
              onSelectItem={this.onSelectItem}
            />
            : null
        }
      </div>
    )
  }
}

export default UISelect