import React, { Component } from 'react';
import {  BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TodoApp as TodoAppSemanticUi  } from './Components/SemanticUi/TodoApp.js';
import { CalculatorApp } from './Components/Calculator/CalculatorApp.js';
import { TestApp } from './Components/miniTests/testApp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
  		<BrowserRouter>
  		  <div>
          <Switch>
            <Route exact path="/" render={()=> <Redirect to="/tests"/>} />
            <Route path="/semantic" render={({match}) => (
                  <TodoAppSemanticUi match={match}/>
                )
              } />
            <Route path="/Games" render={({match}) => (
                  <CalculatorApp match={match}/>
                )
              } />
            <Route path="/tests" render={({match}) => (
                  <TestApp match={match}/>
                )
              } />
            <Route render={() => <div>404 ERROR</div> } />
          </Switch>
    	  </div>
  		</BrowserRouter>
      </div>
    );
  }
}

export default App;
