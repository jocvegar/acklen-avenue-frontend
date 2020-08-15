import React from 'react';
import './App.css';
import Bar from './components/Bar';
import Home from './Home';
import About from './About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
   return(
    <div>
      <Router>
        <Bar/>  
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
   )
  }
}

export default App;
