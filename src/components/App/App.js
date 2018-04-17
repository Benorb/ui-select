import React, { Component } from 'react';
import './App.css';
import data1 from '../../data/select1.json';
import data2 from '../../data/select1.json';
import UISelect from "../UI_Select/UI.Select";

class App extends Component {
  render() {
    return (
      <div className="test-app">
        <div className="row">
          <div className="col col1">
            <UISelect options={data1} tabIndex={0}/>
          </div>
        </div>

        <div className="row">
          <UISelect options={data2} tabIndex={1}/>
        </div>

        <div className="row">
          <UISelect options={data1} tabIndex={2}/>
        </div>
      </div>
    );
  }
}

export default App;
