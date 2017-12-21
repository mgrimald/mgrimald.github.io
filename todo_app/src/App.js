import React, { Component } from 'react';
import './App.css';
import {  BrowserRouter } from 'react-router-dom';
import { Header } from './Components/Header.js';
import { Title } from './Components/Title.js';
import { TodoApp } from './Components/TodoApp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
  		<BrowserRouter>
  		  <div>
  			<Header />
	        <Title />
    	    <TodoApp />
    	  </div>
  		</BrowserRouter>
      </div>
    );
  }
}

export default App;
