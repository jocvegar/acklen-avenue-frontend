import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { Redirect } from "react-router-dom";


function Login() {   
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setuserEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { setAuthTokens } = useAuth();

    function postLogin() {
        axios.post("http://localhost:3000/api/users/sign_in", {
            user: {
                email: email,
                password: password,
            }
        }).then(result => {
            console.log("result.data")
            console.log(console.log(result.data))
            console.log("result.status")
            console.log(result.status)
            if (result.status) {
                // setAuthTokens(result.data);
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }).catch(e => {
            setIsError(true)
            console.log("e " + e)
        })
    }

    function submitForm(e) {
        e.preventDefault();
        postLogin();

    }

    // if (isLoggedIn) {
    //     return <Redirect to="/" />;
    // }

    return(
        <div id="login">
            <div className="container pt-1">
                <h2 className="text-center py-5">Welcome!</h2>
                {isError &&
                    <Alert className="mb-5" variant="danger" onClose={() => setIsError(false)} dismissible>
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
                                setuserEmail(e.target.value)
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
