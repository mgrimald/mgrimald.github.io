import React, { Component } from 'react';
import {  BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TodoApp as TodoAppBasicCss  } from './Components/Basic-css/TodoApp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
  		<BrowserRouter>
  		  <div>
        <Switch>
          <Route exact path="/" render={()=> <Redirect to="/basic"/>} />
          <Route path="/basic" render={({match}) => (
                <TodoAppBasicCss match={match}/>
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
