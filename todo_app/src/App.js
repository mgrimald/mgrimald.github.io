import React, { Component } from 'react';
import {  BrowserRouter, Switch, Route } from 'react-router-dom';
import { TodoApp as TodoAppSemanticUi  } from './Components/SemanticUi/TodoApp.js';
import { CalculatorApp } from './Components/Calculator/CalculatorApp.js';
import { TestApp } from './Components/miniTests/testApp.js';
import { Homepage } from "./Homepage.js";

class App extends Component {
  render() {
    const links = [
      {
        to: "semantic", 
        name: "semantic"
      },
      {
        to: "Games",
        name: "Games"
      },
      {
        to: "tests",
        name: "tests"
      }
    ];
    return (
      <div className="App">
    		<BrowserRouter>
    		  <div>
            <Switch>
              <Route exact path="/"  render={({match}) => (
                    <Homepage match={match} links={links}/>
                  )
                } />
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
