import { Row, Col, Image } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/status/Rating";
import apiFacade from "../apiFacade";
import LibraryBtn from "../components/LibraryBtn";
import Status from "../components/status/Status";
function BookPage({ isLoggedIn }) {
    const [book, setBook] = useState();
    const { key } = useParams();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.fetchBookDetails(key, setBook, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

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
                        {book.subtitle && <h4><small className="text-muted">{book.subtitle}</small></h4>}
                        <h4><small className="text-muted">{book.series.map((s, i) => [i > 0 && ", ", s])}</small></h4>
                        <p>By: {book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                        <p>{book.number_of_pages_median} pages</p>
                        <p>Released: {book.first_publish_year}</p>
                        <p>{book.edition_name} {book.physical_format && `(${book.physical_format})`}</p>
                        <Status bookId={key} mounted={mounted} isLoggedIn={isLoggedIn} />
                        <Rating bookId={key} mounted={mounted} isLoggedIn={isLoggedIn} />
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