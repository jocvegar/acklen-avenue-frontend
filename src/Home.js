import React, { Component }from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      candidates: [],
      showModal: false,
      first_name: "",
      last_name: "",
      email: "",
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleNewFormChange = this.handleNewFormChange.bind(this);
    this.submitNewForm = this.submitNewForm.bind(this);
  }

  setToken() {
    return (
      JSON.parse(localStorage.getItem('acklen_tokens'))["token"]
    )
  }

  componentDidMount() {
    this.getCandidates()
  }

  getCandidates() {
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

  handleModalHide() {
    this.setState({ showModal: false });
  }

  handleModalShow() {
    this.setState({ showModal: true });
  }

  handleNewFormChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitNewForm() {
    const apiURL = process.env.REACT_APP_API_URL
    let token = this.setToken()
    axios.post(`${apiURL}/candidates`, {
      candidate: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
      },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(()=> {
      this.setState({ 
        first_name: "",
        last_name: "",
        email: ""
      });
      this.handleModalHide()
      this.getCandidates()
    })
    .catch((e) => console.log(e))
  }
  
  render() {
   return(
    <div className="container"> 
      <h1 className="text-center pt-3 pb-5">Candidates</h1> 
      <div className="row pb-4 text-center">
        <div className="col-6">
          <button 
            type="button" 
            className="btn btn-outline-success btn-sm btn-block"
            onClick={() => this.handleModalShow()}>
            + Add
          </button>
        </div>
        <div className="col-6">
        <button 
          type="button" 
          className="btn btn-outline-secondary btn-sm btn-block">
          Sort
        </button>
        </div>
      </div>
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
                onClick={() => {if(window.confirm('Are you sure to delete this candidate?'))this.handleRemove(candidate.slug, idx)}}>
                Remove
              </button>
          </td>
          </tr>
        )}
        </tbody>
      </table>
      </div>

      <Modal show={this.state.showModal} false onHide={() => this.handleModalHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Add new candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control 
                type="text"
                name="first_name" 
                placeholder="first name" 
                size="sm"
                value={this.state.first_name}
                onChange={this.handleNewFormChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Control 
                type="text" 
                name="last_name" 
                placeholder="last name" 
                size="sm" 
                onChange={this.handleNewFormChange}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Control 
                type="email" 
                name="email" 
                placeholder="email@example.com" 
                size="sm" 
                onChange={this.handleNewFormChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleModalHide()}>
            Cancel
          </Button>
          <Button variant="primary" 
            onClick={this.submitNewForm}
            disabled = {!this.state.first_name || !this.state.last_name || !this.state.email}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  
    </div>
   )
  }
}

export default Home;
