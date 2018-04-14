import React, { Component } from 'react';
import './ui.select.css';

class UISelect extends Component {

  constructor(props){
    super(props);

    this.refsArr = [];

    this.state = {
      dropdownOpen: true,
      focusedIndex: null,
      selectedId: null,
      mouseControl: false
    };
  }
  
  componentWillMount() {
    document.addEventListener("keydown", this.handleDownKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleDownKey, false);
  }

  // Pressing DOWN key when UIControl is closed will open the dropdown
  handleDownKey = (e) => {
    const { dropdownOpen } = this.state;

    if(e.keyCode === 40 && !dropdownOpen){
      this.setState({ dropdownOpen: true })
    }

    if(dropdownOpen){
      this.handleKeyboardNavigation(e)
    }
  }

  handleKeyboardNavigation = (e) => {
    const { focusedIndex } = this.state;
    const { options } = this.props;

    switch(e.keyCode) {
      case 38: { // up arrow
        const newIndex = focusedIndex - 1;
        focusedIndex > 1 && this.setState({focusedIndex: newIndex}, () => {
          this.scrollToIndex(newIndex);
        });
        break;
      }
      case 40: { // down arrow
        const newIndex = focusedIndex + 1;
        focusedIndex <  options.length - 1 && this.setState({focusedIndex: newIndex}, () => {
          this.scrollToIndex(newIndex);
        });
        break;
      }
      case 13: { // enter
        console.log(options[focusedIndex]);
        break;
      }
      default:
        return
    }
  }

  scrollToIndex = (index) => {
    this.refsArr[index].scrollIntoView({ block: "center", inline: "nearest" });
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
    if(dropdownOpen) {
      // If the dropdown is currently opened, so its about to be closed.
      this.clearFocusedIndex();
    }
    this.setState({dropdownOpen: !dropdownOpen});
  }

  // Click outside control should close it (in case it open)
  // i used dropdownOpen && ... for the setState will happen only when the dropdown is opened.
  onBlur = () => {
    const { dropdownOpen } = this.state;
    dropdownOpen && this.setState({dropdownOpen: false});
  }

  onMouseOver = (e,i) => {
    this.setState({focusedIndex: i});
  }

  onMouseOut = () => {
    this.clearFocusedIndex();
  }

  clearFocusedIndex = () => {
    this.setState({focusedIndex: null});
  }

  setRef = (ref, i) =>{
    this.refsArr[i] = ref;
  }

  click = () => {
    console.log(this.refsArr);
    this.refsArr[4].scrollIntoView();
  }

  render() {
    const { dropdownOpen, focusedIndex, selectedId  } = this.state;
    const { options } = this.props;
    const arrowDirection = dropdownOpen ? 'arrow-up' : 'arrow-down';

    return (
      <div
        className="container"
        tabIndex={0}
        onBlur={ this.onBlur }
      >
        <div className="select" onClick={this.toggleSelect}>
          <div className="text" id="hash">
            {options.find((item) => item.id === selectedId).name}
            {/*If i could assume that the placeholder will always be the first value,
               so i would do {options[0].name}  */}
          </div>

          <div className={arrowDirection}/>

        </div>

        {
          dropdownOpen ?
            <div>
              <div className="triangle-up"/>
              <div className="dropdown">
                {/*<input type="hidden"/>*/}
                {
                  options.map((item, i) =>
                  <div
                    key={item.id}
                    onMouseOver={(e) => this.onMouseOver(e,i)}
                    onMouseOut={this.onMouseOut}
                    ref={(ref) => this.setRef(ref, i)}
                    className={`listRow ${focusedIndex === i ? 'active' : ''} ${item.id === null ? 'disabled' : ''}`}>
                    <div
                      className={`dropdown-text`}
                      onClick={() => this.onSelectItem(item, i)}>
                      {item.name}
                    </div>
                  </div>
                  )
                }
              </div>
            </div>
            : null
        }
      </div>
    )
  }
}

export default UISelect