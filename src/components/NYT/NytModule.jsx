import { ListGroup, FormSelect, Row, Col } from "react-bootstrap";
import Bestseller from "./Bestseller";
import { useEffect, useRef, useState } from "react";

function NYT({ isLoggedIn }) {
    const [listSelect, setListSelect] = useState();
    const [list, setList] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        // TODO: fetch list and set with SetList();
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        // TODO: fetch list and set with SetList();
    }, [listSelect]);

    return (
        <>
            <Row className="mt-4">
                <Col xs={12} md><h3 >New York Times Bestsellers</h3></Col>
                <Col xs={12} md><FormSelect
                    name="list"
                    value={listSelect}
                    aria-label="nyt bestseller list select"
                    onChange={e => setListSelect(e.target.value)}
                    className="my-2"
                >
                    <option value="fiction">Fiction</option>
                    <option value="nonfiction">Nonfiction</option>
                    <option value="selfhelp">Self help</option>
                </FormSelect></Col>
            </Row>
            <Row>
                <ListGroup>
                    <ListGroup.Item><Bestseller /></ListGroup.Item>
                    <ListGroup.Item><Bestseller /></ListGroup.Item>
                    <ListGroup.Item><Bestseller /></ListGroup.Item>
                    <ListGroup.Item><Bestseller /></ListGroup.Item>
                    <ListGroup.Item><Bestseller /></ListGroup.Item>
                    <ListGroup.Item><Bestseller /></ListGroup.Item>
                </ListGroup>
            </Row>
        </>
    );
}

export default NYT;