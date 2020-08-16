import React, { Component }from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      candidates: []
    };

    this.handleRemove = this.handleRemove.bind(this);
  }

  setToken() {
    return (
      JSON.parse(localStorage.getItem('acklen_tokens'))["token"]
    )
  }

  componentDidMount() {
    const apiURL = process.env.REACT_APP_API_URL
    let token = this.setToken()
    axios.get(`${apiURL}/candidates`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const candidates = res.data;
      this.setState({ candidates });
    })
  }

  removeCandidate(index) {
    const candidates = [...this.state.candidates]
    candidates.splice(index, 1);

    this.setState({
      candidates
    });
  }

  handleRemove(slug, index) {
    const apiURL = process.env.REACT_APP_API_URL
    let token = this.setToken()
    axios.delete(`${apiURL}/candidates/${slug}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      this.removeCandidate(index)
    }).catch((e) => console.log(e))
  }


  render() {
   return(
    <div className="container"> 
      <h1 className="text-center pt-3 pb-5">Candidates</h1> 
      <div className="responsive">
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Delete?</th>
        </tr>
        </thead>
        <tbody>
        { this.state.candidates.map((candidate, idx) => 
          <tr key={candidate.slug}>
            <td>{candidate.first_name}</td>
            <td>{candidate.last_name}</td>
            <td>{candidate.email}</td>
            <td>{candidate.status}</td>
            <td className="text-center">
              <button 
                type="button" 
                className="btn btn-danger btn-sm"
                onClick={() => this.handleRemove(candidate.slug, idx)}>
                Remove
              </button>
          </td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
    </div>
   )
  }
}

export default Home;
