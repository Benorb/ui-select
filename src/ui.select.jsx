import React, { Component } from 'react';
import './ui.select.css';

class UISelect extends Component {

  state = {
      dropdownOpen: true,
  };
  
  componentWillMount(){
    document.addEventListener("keydown", this.handleDownKey, false);
  }
  
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleDownKey, false);
  }

  // Pressing DOWN key when UIControl is closed will open the dropdown
  handleDownKey = (e) => {
    const { dropdownOpen } = this.state;

    if(e.keyCode === 40 && !dropdownOpen){
      this.setState({ dropdownOpen: true })
    }
  }

  onSelectItem = (item, i) => {
    console.log(item)
    this.setState({ dropdownOpen: false });
  }

  toggleSelect = () => {
    const { dropdownOpen } = this.state;
    this.setState({dropdownOpen: !dropdownOpen});
  }

  // Click outside control should close it (in case it open)
  // i used dropdownOpen && ... for the setState will happen only when the dropdown is opened.
  onBlur = () => {
    const { dropdownOpen } = this.state;
    dropdownOpen && this.setState({dropdownOpen: false});
  }

  onInputChange = (e) => {
    console.log('e', e)
  }

  render() {
    const { dropdownOpen } = this.state;
    const { options } = this.props;
    const arrowDirection = dropdownOpen ? 'arrow-up' : 'arrow-down';

    return (
      <div
        className="container"
        tabIndex="0"
        onBlur={ this.onBlur }
      >
        <div className="select" onClick={this.toggleSelect}>
          <div className="text">
            {options.find((item) => item.id === null).name}
            {/*If i could assume that the placeholder will always be the first value,
               so i would do {options[0].name}  */}
          </div>

          <div className="text">
              <div className={arrowDirection}/>
          </div>
        </div>

        {
          dropdownOpen ?
            <div>
              <input
                ref={(input) => { this.inputRef = input }}
                className="hidden-input"
                // onKeyPress={this.onInputChange}
                // type="hidden"
              />
              <div className="triangle-up"/>
              <div className="dropdown">
                {
                  options.map((item, i) =>
                  <div key={item.id} className="listRow">
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