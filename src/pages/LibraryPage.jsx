import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import LibraryBtn from "../components/LibraryBtn";
import apiFacade from "../apiFacade";
import Rating from "../components/status/Rating";
import Status from "../components/status/Status";
export default function LibraryPage({ user }) {
    const [library, setLibrary] = useState();
    const navigate = useNavigate();
    const mounted = useRef(true);
    function LibraryItem({ item }) {
        return (
            <Row className="my-2">
                <Col xs={5} md={4} lg={3}>
                    <Image fluid src={item.book.thumbnail_urls[2]} thumbnail onClick={() => navigate(`/book/${item.book.key}`)} />
                </Col>
                <Col  xs={7} md={8} lg={9}>
                    <div className="h-100">
                        <h3>{item.book.title}</h3>
                        <p key="pAuthor">by: {item.book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                        <p key="pPublished">First published in: {item.book.first_publish_year}</p>
                        <Status bookId={item.book.key} mounted={mounted} isLoggedIn={!!user} />
                        <Rating bookId={item.book.key} mounted={mounted} isLoggedIn={!!user} />
                        <LibraryBtn key={item.book.key} isLoggedIn={!!user} passedLibrary={library} />
                    </div>
                </Col>
            </Row>
        )
    }
    useEffect(() => {
        apiFacade.fetchLibrary(setLibrary, mounted);
        return () => mounted.current = false;
    }, []);

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