import { Link } from "react-router-dom";

function SignupSuccess({ user }) {
    return (
        <div className="mt-5" align="center">
            <h3>Succesfully created account!</h3>
            <p>Welcome aboard, {user.username}.</p>
            <p>Go to the <Link to="/login">login page.</Link></p>
        </div>
    );
}

export default SignupSuccess;