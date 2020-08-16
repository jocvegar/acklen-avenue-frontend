import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  state = {
    candidates: []
  }

  setToken() {
    return (
      JSON.parse(localStorage.getItem('acklen_tokens'))["token"]
    )
  }

  componentDidMount() {
    const apiURL = process.env.REACT_APP_API_URL
    // axios.get(`https://acklen-avenue-backend.herokuapp.com/api/candidates`)
    let token = this.setToken()
    axios.get(`${apiURL}/candidates`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const candidates = res.data;
      this.setState({ candidates });
    })
  }
  render() {
   return(
    <div> 
      <h1>Hola!</h1> 
      <ul>
        { this.state.candidates.map(candidate => 
          <li key={candidate.slug}>{candidate.email}</li>
        )}
      </ul>
    </div>
   )
  }
}

export default Home;
