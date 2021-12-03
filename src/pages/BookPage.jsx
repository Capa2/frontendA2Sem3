import BookProp from "../components/BookProp";
import { Row, Col, Image, FormSelect } from "react-bootstrap";
import { useState } from "react";
import Rating from "../components/Rating";

function BookPage() {
    const [status, setStatus] = useState();
    return (
        <Row>
            <Col lg="4" md="4" xs="12">
                <Image thumbnail className="mx-auto d-block mb-2" fluid src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1409595968l/929.jpg" alt="cover" />
            </Col>
            <Col lg="8" md="8" xs="12">
                <Row>
                    <h1>Memoirs of a Geisha</h1>

                    <p>By Arthur Golden</p>
                    <p>6969 pages</p>
                    <p>Released 6/9 2069</p>
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
                            <p>
                                Subject, Genre, Subject, Genre, Subject, Genre, Subject, Genre, Subject, Genre, Subject, Genre, Subject, Genre, Subject, Genre
                            </p>
                        </Col>
                    </Row>
                </Row>
            </Col>

        </Row>
    );
}

export default BookPage;