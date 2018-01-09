import React, { Component } from 'react';
import {  BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TodoApp as TodoAppSemanticUi  } from './Components/SemanticUi/TodoApp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
  		<BrowserRouter>
  		  <div>
        <Switch>
          <Route exact path="/" render={()=> <Redirect to="/semantic"/>} />
          <Route path="/semantic" render={({match}) => (
                <TodoAppSemanticUi match={match}/>
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
