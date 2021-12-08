import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function ReadMoreBtn({ singleKey }) {
    const navigate = useNavigate();

    function go() {
        console.log(singleKey);
        navigate(`/book/${singleKey}`);
    }

    return (
        <Button className="m-1"
            value={singleKey}
            onClick={go}
        >Read More
        </Button>
    );
}

export default ReadMoreBtn;