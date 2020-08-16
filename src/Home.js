import React, { Component }from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      candidates: [],
      filterCandidates: [],
      showModal: false,
      first_name: "",
      last_name: "",
      email: "",
      sortBy: "all"
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleNewFormChange = this.handleNewFormChange.bind(this);
    this.submitNewForm = this.submitNewForm.bind(this);
    this.filterCandidates = this.filterCandidates.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
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
      this.setState({ 
        candidates: candidates, 
        filterCandidates:candidates 
      });
    })
  }

  removeCandidate(index) {
    const candidates = [...this.state.candidates]
    candidates.splice(index, 1);

    this.setState({
      candidates: candidates,
      filterCandidates: candidates
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

  filterCandidates(filter_word) {
    let filterCandidates = [];
    this.setState({
      sortBy: filter_word
    }, () => {
      if (this.state.sortBy === "all") {
        filterCandidates = this.state.candidates;
      } else {
        filterCandidates = this.state.candidates.filter(
          candidate => candidate.status === filter_word
        );
      }
      this.setState({ filterCandidates });
    })
  }

  handleChangeSelect(event, candidate) {
    const apiURL = process.env.REACT_APP_API_URL
    let token = this.setToken()
    axios.patch(`${apiURL}/candidates/${candidate}`, {
      candidate: {
        status: event.target.value
      },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(()=> {
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
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
                Sort by {this.state.sortBy}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.filterCandidates("all")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterCandidates("review")}>Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterCandidates("pass")}>Pass</Dropdown.Item>
              <Dropdown.Item onClick={() => this.filterCandidates("declined")}>Declined</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        { this.state.filterCandidates.map((candidate, idx) => 
          <tr key={candidate.slug}>
            <td>{candidate.first_name}</td>
            <td>{candidate.last_name}</td>
            <td>{candidate.email}</td>
            <td>
              <Form>
                <Form.Group controlId="exampleForm.selectStatus">
                  <Form.Control as="select" onChange={(event) => this.handleChangeSelect(event, candidate.slug)}>
                    <option defaultvaluevalue={candidate.status}>{candidate.status}</option>
                    <option value="review">review</option>
                    <option value="pass">pass</option>
                    <option value="declined">declined</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </td>
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
