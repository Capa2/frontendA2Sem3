import { useState } from "react";
import SignupForm from "../components/SignupForm";
import SignupSuccess from "../components/SignupSuccess";

export default function SignupPage() {
    const [confirmation, setConfirmation] = useState();

    function success(user) {
        setConfirmation(<SignupSuccess user={user} />)
    }

    return (
        <>
            <h2 align="center">Sign up</h2>
            <SignupForm success={success} />
            {confirmation}
        </>
    );
}