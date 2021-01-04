import {Route, Switch, Redirect} from 'react-router-dom'
import React from 'react'
import {AuthContext} from './context/AuthContext'


import Home from './pages/Home'
import ExercisesList from './pages/ExercisesList'
import Workout from './pages/Workout'
import {useAuth} from './hooks/auth.hook'


function App() {
  const {login, logout, userId } = useAuth()
  return (
    <AuthContext.Provider value={{
      login, logout, userId
    }}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/list"  component={ExercisesList}/>
          <Route path="/workout"  component={Workout}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
