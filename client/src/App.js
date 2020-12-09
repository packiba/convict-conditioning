import {Route, Switch, Redirect} from 'react-router-dom'
import React from 'react'

import Home from './pages/Home'
import ExercisesList from './pages/ExercisesList'
import Workout from './pages/Workout'


function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/list"  component={ExercisesList}/>
          <Route path="/workout"  component={Workout}/>
          <Redirect to="/" />
        </Switch>
    </div>
  );
}

export default App;
