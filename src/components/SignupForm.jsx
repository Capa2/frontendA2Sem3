import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import userFacade from "../auth/userFacade";

export default function SignupForm({ success }) {
    const { signup } = userFacade();
    const [usernameValue, setUsernameValue] = useState();
    const [passwordValue, setPasswordValue] = useState();
    const [isProcessing, setIsProcessing] = useState();

    function submitLogin(event) {
        event.preventDefault();
        setIsProcessing(true);
        signup(usernameValue, passwordValue)
            .then(res => success(res));
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

        <Button className="d-block mx-auto" type="submit" size="lg" disabled={!usernameValue || !passwordValue || isProcessing}>{isProcessing ? '...' : 'Sign up'}</Button>
    </Form>
}