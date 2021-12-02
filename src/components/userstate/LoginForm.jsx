import { useState } from "react";
import { Button, Form, FormControl, Alert } from "react-bootstrap";

export default function LoginForm({ login }) {
    const [usernameValue, setUsernameValue] = useState();
    const [passwordValue, setPasswordValue] = useState();
    const [isLoggingIn, setIsLoggingIn] = useState();
    const [errorMessage, setErrorMessage] = useState();

    function submitLogin(event) {
        event.preventDefault();
        setIsLoggingIn(true);
        login(usernameValue, passwordValue)
            .catch(err => {
                if (err.status) {
                    err.fullError.then(e => {
                        setErrorMessage(e.message);
                    })
                }
                else {
                    setErrorMessage("Network error")
                }
                setIsLoggingIn(false);
            });
    }

    return <Form className="loginForm mt-3 m-auto" onSubmit={submitLogin}>
        <FormControl
            onChange={e => setUsernameValue(e.target.value)}
            className="mb-3"
            type="text"
            placeholder="username"
            id="username" />

        <FormControl
            onChange={e => setPasswordValue(e.target.value)}
            className="mb-3"
            type="password"
            placeholder="password"
            id="password" />

        <Button className="d-block mx-auto" type="submit" size="lg" disabled={!usernameValue || !passwordValue || isLoggingIn}>{isLoggingIn ? '...' : 'Sign in'}</Button>
        {errorMessage && <Alert className="mt-3" key={'loginError'} variant={'danger'}>{errorMessage}</Alert>}
    </Form>
}