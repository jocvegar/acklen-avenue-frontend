import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function Login() {   
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        axios.post("http://localhost:3000/api/users/sign_in", {
            user: {
                email: email,
                password: password,
            }
        }).then(result => {
            if (result.status) {
                setAuthTokens(result.data);
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }).catch(e => {
            setHasError(true)
            console.log("e " + e)
        })
    }

    function submitForm(e) {
        e.preventDefault();
        postLogin();
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return(
        <div id="login">
            <div className="container pt-1">
                <h2 className="text-center py-5">Welcome!</h2>
                {hasError &&
                    <Alert className="mb-5" variant="danger" onClose={() => setHasError(false)} dismissible>
                        The username or password provided were incorrect!
                    </Alert>
                }
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }} />
                        <Form.Text className="text-muted">
                            Please type in your email
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }} />
                    </Form.Group>
           
                    <Button 
                        variant="primary" 
                        type="submit"
                        onClick={submitForm}>
                        Sign In
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;
