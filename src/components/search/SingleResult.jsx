import { useNavigate } from "react-router";
import { Image, ListGroup, Row, Col } from "react-bootstrap";
import LibraryBtn from "../LibraryBtn";
import { useEffect, useState } from "react";
import ReadMoreBtn from "../ReadMoreBtn";
import { useContext } from "react";
import { LibraryContext } from "../../App";

function SingleResult({ singleResult, isLoggedIn }) {
    const [library, setLibrary] = useContext(LibraryContext);
    const navigate = useNavigate();
    const [inLibrary, setInLibrary] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (library) {
            setInLibrary(library.library.find(item => item.book.key === singleResult.key));
            setIsLoaded(true);
        }
    }, [library, singleResult.key]);

    return (

        <Row className="mb-4">
            <Col xs={5} md={4} lg={3}>
                <Image src={singleResult.thumbnail_urls[2]} className="float-start me-2" thumbnail onClick={() => navigate(`/book/${singleResult.key}`)} />
            </Col>
            <Col xs={7} md={8} lg={9}>
                <ListGroup>
                    <ListGroup.Item className="mb-0" as="h3">{singleResult.title}</ListGroup.Item>
                    <ListGroup.Item className="mb-0">
                        <Row>
                            {singleResult.authors.length > 0 && <Col sm="12" lg>{singleResult.authors.length > 1 ? "Authors" : "Author"}: {singleResult.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</Col>}
                            {singleResult.number_of_pages_median !== 0 && <Col sm="12" lg>{singleResult.number_of_pages_median} pages</Col>}
                            {singleResult.first_publish_year > 0 && <Col sm="12" lg>Published: {singleResult.first_publish_year}</Col>}
                        </Row>
                    </ListGroup.Item>
                    {singleResult.subjects.length >= 1 && <ListGroup.Item className="subjects mb-0">
                        <p className="subjects">
                            {singleResult.subjects.map((s, i) =>
                                [i > 0 && ", ", <a href="/" key={s.key}>{s.name}</a>]
                            )}
                        </p>
                    </ListGroup.Item>
                    } < ListGroup.Item className="mb-0">
                        <ReadMoreBtn singleKey={singleResult.key} />
                        <LibraryBtn singleKey={singleResult.key} isLoggedIn={isLoggedIn} isLoaded={isLoaded} inLibrary={inLibrary} />
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row >
    )
}

export default SingleResult;
