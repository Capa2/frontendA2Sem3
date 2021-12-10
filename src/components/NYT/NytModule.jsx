import { ListGroup } from "react-bootstrap";
import Bestseller from "./Bestseller";

function NYT({ isLoggedIn }) {

    return (
        <>
            <h3 className="mt-4">New York Times Bestsellers</h3>
            <ListGroup>
                <ListGroup.Item><Bestseller /></ListGroup.Item>
                <ListGroup.Item><Bestseller /></ListGroup.Item>
                <ListGroup.Item><Bestseller /></ListGroup.Item>
                <ListGroup.Item><Bestseller /></ListGroup.Item>
                <ListGroup.Item><Bestseller /></ListGroup.Item>
                <ListGroup.Item><Bestseller /></ListGroup.Item>
            </ListGroup>
        </>
    );
}

export default NYT;