import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Login() {
    return(
        <div id="Login">
            <div className="container pt-1">
                <h2 className="text-center py-5">Welcome!</h2>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        Please type in your email
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">

                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
           
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;
