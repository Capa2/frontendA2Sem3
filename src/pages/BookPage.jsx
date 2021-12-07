import { Row, Col, Image, FormSelect } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/rating/Rating";
import apiFacade from "../apiFacade";
import LibraryBtn from "../components/LibraryBtn";
function BookPage({ isLoggedIn }) {
    const [status, setStatus] = useState();
    const [book, setBook] = useState();
    const { key } = useParams();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.fetchBookDetails(key, setBook, mounted);
    }, []);

    useEffect(() => {
        //TODO: do status stuff but also put it in a component
    }, [status]);

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        //console.log(book);
    }, [book]);

    if (!book) return <h2>Loading {key} ...</h2>;

    return (
        <Row>
            <Col lg="4" md="4" xs="12">
                <Image thumbnail className="mx-auto d-block mb-2" fluid src={book.thumbnail_urls[2]} alt="cover" />
                {book.links.length > 0 &&
                    <div>
                        <p><b>Links:</b></p>
                        {book.links.map(l => <p><a href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a></p>)}
                    </div>}
            </Col>
            <Col lg="8" md="8" xs="12">
                <Row>
                    <Col>
                        <h1>{book.title}</h1>
                        {book.subtitle && <h4><small class="text-muted">{book.subtitle}</small></h4>}
                        <h4><small class="text-muted">{book.series.map((s, i) => [i > 0 && ", ", s])}</small></h4>
                        <p>By: {book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                        <p>{book.number_of_pages_median} pages</p>
                        <p>Released: {book.first_publish_year}</p>
                        <p>{book.edition_name} {book.physical_format && `(${book.physical_format})`}</p>
                        <FormSelect
                            name="status"
                            value={status}
                            aria-label="book status"
                            onChange={e => setStatus(e.target.value)}
                            className="my-2"
                        >
                            <option value="none">status</option>
                            <option value="wantTo">want to read</option>
                            <option value="reading">reading</option>
                            <option value="read">read</option>
                        </FormSelect>
                        <Rating bookId={key} initRating="0" status={status} />
                        <LibraryBtn bookId={book.key} isLoggedIn={isLoggedIn} />
                    </Col>
                    <Row>
                        <Col>
                            {book.descriptions.map(d => <p>{d}</p>)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{book.subjects.map((s, i) => [i > 0 && ", ", <a href="/" key={s.key}>{s.name}</a>])}</p>
                        </Col>
                    </Row>
                </Row>
            </Col>

        </Row>
    );
}

export default BookPage;