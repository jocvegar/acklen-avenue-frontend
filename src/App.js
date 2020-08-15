import React, { useState } from 'react';
import './App.css';
import Bar from './components/Bar';
import Home from './Home';
import About from './About';
import Login from './Login';
import Private from './Private';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from "./context/auth";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("acklen_tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const setTokens = (data) => {
    localStorage.setItem("acklen_tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return(
  <div>
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Bar />  
        <Switch>
          <Private path="/" exact component={Home} />
          <Private path="/about" component={About} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  </div>
  )
}

export default App;
