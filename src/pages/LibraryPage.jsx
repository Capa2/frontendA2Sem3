import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import LibraryBtn from "../components/LibraryBtn";
import Rating from "../components/status/Rating";
import Status from "../components/status/Status";
export default function LibraryPage({ user, library }) {
    const navigate = useNavigate();
    const mounted = useRef(true);

    function LibraryItem({ item }) {
        return (
            <Row className="my-2">
                <Col xs={5} md={4} lg={3}>
                    <Image fluid src={item.book.thumbnail_urls[2]} thumbnail onClick={() => navigate(`/book/${item.book.key}`)} />
                </Col>
                <Col xs={7} md={8} lg={9}>
                    <ListGroupItem className="h-100">
                        <h3>{item.book.title}</h3>
                        <p>by: {item.book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                        <p>First published in: {item.book.first_publish_year}</p>
                        <Status bookId={item.book.key} mounted={mounted} isLoggedIn={!!user} inLibrary={item} />
                        <Rating bookId={item.book.key} mounted={mounted} isLoggedIn={!!user} inLibrary={item} />
                        <LibraryBtn bookId={item.book.key} isLoggedIn={!!user} isLoaded={true} inLibrary={item} />
                    </ListGroupItem>
                </Col>
            </Row>
        )
    }

    if (!user) {
        return <h1>Please login</h1>
    }

    return (
        <div>
            <h1>{user.username}'s library</h1>
            {library
                ? library.size > 0 ?
                    <ListGroup>
                        {library.library.map(item => <LibraryItem key={item.book.key} item={item} />)}
                    </ListGroup>
                    : <p>Your library is empty. Add some books.</p>
                : <p>Loading...</p>}
        </div>
    );
}