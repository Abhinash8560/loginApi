import React from 'react';
import './App.css';
import Login from './components/Login';
import {Route,Switch} from "react-router-dom";
import Home from "./components/Home";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path='/home' component={Home} />
      <Route exact path='/' component={Login} />

      <Route  path="/users/add" component={AddUser} />
          <Route  path="/users/edit/:id" component={EditUser} />
          <Route  path="/users/:id" component={User} />
      </Switch>
    </div>
  );
}

export default App;