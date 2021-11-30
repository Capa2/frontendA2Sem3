import { Link } from "react-router-dom";
import LoginForm from "../components/userstate/LoginForm";

export default function LoginPage({ login }) {
    return (
        <>
            <h2 align="center">Sign in</h2>
            <LoginForm login={login} />
            <p className="mt-5" align="center"><i>Don't have an account? <Link to="/signup">Click here to get started.</Link></i></p>
        </>
    );
}