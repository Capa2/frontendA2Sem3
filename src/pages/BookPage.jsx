import { Row, Col, Image, FormSelect } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import apiFacade from "../apiFacade";
import LibraryBtn from "../components/LibraryBtn";
function BookPage({isLoggedIn}) {
    const [status, setStatus] = useState();
    const [book, setBook] = useState();
    const { key } = useParams();
    const mounted = useRef(true);

    function setResultAsBook(result) {
        setBook(result.results[0]);
    }

    useEffect(() => {
        apiFacade.fetchSearchResults(key, setResultAsBook, mounted);
    }, []);

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        //console.log(book);
    }, [book]);

    if (!book) return <h1>Loading {key} ...</h1>;

    return (
        <Row>
            <Col lg="4" md="4" xs="12">
                <Image thumbnail className="mx-auto d-block mb-2" fluid src={book.thumbnail_urls[2]} alt="cover" />
            </Col>
            <Col lg="8" md="8" xs="12">
                <Row>
                    <h1>{book.title}</h1>
                    <p>By: {book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                    <p>{book.number_of_pages_median} pages</p>
                    <p>Released: {book.first_publish_year}</p>
                    <p>First Edition (Hardcover)</p>
                    <FormSelect
                        name="status"
                        value={status}
                        aria-label="book status"
                        onChange={e => setStatus(e.target.value)}
                        className="my-2 w-66"
                    >
                        <option value="none">status</option>
                        <option value="wantTo">want to read</option>
                        <option value="reading">reading</option>
                        <option value="read">read</option>
                    </FormSelect>
                    <Rating className="my-2" initRating="2" />
                    <LibraryBtn bookId={book.key} isLoggedIn={isLoggedIn} />
                    <Row>
                        <Col>
                            <p>
                                A literary sensation and runaway bestseller, this brilliant debut novel presents with seamless authenticity and exquisite lyricism the true confessions of one of Japan's most celebrated geisha.
                                In Memoirs of a Geisha, we enter a world where appearances are paramount; where a girl's virginity is auctioned to the highest bidder; where women are trained to beguile the most pow
                            </p>
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