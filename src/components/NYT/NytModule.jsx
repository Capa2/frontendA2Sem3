import { ListGroup, FormSelect, Row, Col } from "react-bootstrap";
import Bestseller from "./Bestseller";
import { useEffect, useRef, useState } from "react";
import apiFacade from "../../apiFacade";

function NYT({ isLoggedIn }) {
    const [listSelect, setListSelect] = useState();
    const [list, setList] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        // TODO: fetch list and set with SetList();
        setListSelect("combined-print-and-e-book-fiction");
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        // TODO: fetch list and set with SetList();
        if(listSelect) apiFacade.fetchBestList(listSelect, setList, mounted)
    }, [listSelect]);

    return (
        <>
            <Row className="mt-4">
                <Col xs="12" md><h3 >New York Times Bestsellers</h3></Col>
                <Col xs="12" md><FormSelect
                    name="list"
                    value={listSelect}
                    aria-label="nyt bestseller list select"
                    onChange={e => setListSelect(e.target.value)}
                    className="my-2"
                >
                    <option value="combined-print-and-e-book-fiction">Fiction</option>
                    <option value="combined-print-and-e-book-nonfiction">Nonfiction</option>
                    <option value="advice-how-to-and-miscellaneous">Self help</option>
                    <option value="picture-books">Picture book</option>
                    <option value="young-adult-hardcover">Young adult</option>
                    <option value="graphic-books-and-manga">Graphic and manga</option>
                </FormSelect></Col>
            </Row>
            {list && <Row>
                <ListGroup>
                {list.books.map(book => <ListGroup.Item key={book.primary_isbn13}> <Bestseller  key={book.primary_isbn13} book={book} /></ListGroup.Item>)}
            </ListGroup>
            </Row>}
        </>
    );
}

export default NYT;