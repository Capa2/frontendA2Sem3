import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function BackBtn() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <Button variant="secondary" className="m-1"
            value={"back"}
            onClick={goBack}
        >back
        </Button>
    );
}

export default BackBtn;