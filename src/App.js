import React from 'react';
import './App.css';
import Bar from './components/Bar';
import Home from './Home';
import About from './About';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from "./context/auth";


class App extends React.Component {
  render() {
   return(
    <div>
      <AuthContext.Provider value={false}>
        <Router>
          <Bar/>  
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
   )
  }
}

export default App;
