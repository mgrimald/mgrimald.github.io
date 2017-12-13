import React, { Component } from 'react';
import './App.css';
import { Title } from './Components/Title.js';
import { TodoApp } from './Components/TodoApp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <TodoApp />
      </div>
    );
  }
}

export default App;
