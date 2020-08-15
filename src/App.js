import React from 'react';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import Bar from './components/Bar';


class App extends React.Component {
  state = {
    candidates: []
  }
  componentDidMount() {
    // axios.get(`https://acklen-avenue-backend.herokuapp.com/api/candidates`)
    axios.get('http://localhost:3000/api/candidates')
      .then(res => {
        const candidates = res.data;
        this.setState({ candidates });
      })
  }
  render() {
   return(
    <div>
      <Bar/>
      <h1>Hola!</h1> 
      <Button>PRESSME</Button>
      <ul>
        { this.state.candidates.map(candidate => 
          <li key={candidate.slug}>{candidate.email}</li>
        )}
      </ul>
    </div>
   )
  }
}

export default App;
