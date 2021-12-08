import { Row, Col, Image } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/status/Rating";
import apiFacade from "../apiFacade";
import LibraryBtn from "../components/LibraryBtn";
import Status from "../components/status/Status";
import BackBtn from "../components/BackBtn";
function BookPage({ isLoggedIn }) {
    const [book, setBook] = useState();
    const { key } = useParams();
    const mounted = useRef(true);
    var genKey = 100;
    function getKey() { genKey += 5; return genKey; }

    useEffect(() => {
        apiFacade.fetchBookDetails(key, setBook, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    if (!book) return <h2>Loading {key} ...</h2>;

    return (
        <Row key={getKey()}>
            <Col key={getKey()} lg="4" md="4" xs="12">
                <Image thumbnail className="mx-auto d-block mb-2" fluid src={book.thumbnail_urls[2]} alt="cover" />
                {book.links.length > 0 &&
                    <div key={getKey()}>
                        <p><b>Links:</b></p>
                        {book.links.map(l => <p><a href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a></p>)}
                    </div>}
            </Col>
            <Col key={getKey()} lg="8" md="8" xs="12">
                <Row className="mb-4" key={getKey()}>
                    <Col key={getKey()}>
                        <h1>{book.title}</h1>
                        {book.subtitle && <h4><small className="text-muted">{book.subtitle}</small></h4>}
                        <h4><small className="text-muted">{book.series.map((s, i) => [i > 0 && ", ", s])}</small></h4>
                        <p key={getKey()}>By: {book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                        <p key={getKey()}>{book.number_of_pages_median} pages</p>
                        <p key={getKey()}>Released: {book.first_publish_year}</p>
                        <p key={getKey()}>{book.edition_name} {book.physical_format && `(${book.physical_format})`}</p>
                        <Status bookId={key} mounted={mounted} isLoggedIn={isLoggedIn} />
                        <Rating bookId={key} mounted={mounted} isLoggedIn={isLoggedIn} />
                        <BackBtn />
                        <LibraryBtn singleKey={book.key} isLoggedIn={isLoggedIn} />
                    </Col>
                </Row>
                <Row className="mb-4" key={getKey()}>
                    <Col key={getKey()}>
                        {book.descriptions.map(d => <p key={getKey()}>{d}</p>)}
                    </Col>
                </Row>
                <Row className="mb-4" key={getKey()}>
                    <Col key={getKey()}>
                        <p>{book.subjects.map((s, i) => [i > 0 && ", ", <a href="/" key={s.key}>{s.name}</a>])}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BookPage;