import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Row, Col, ListGroup } from "react-bootstrap";
import LibraryBtn from "../components/LibraryBtn";
import Rating from "../components/status/Rating";
import Status from "../components/status/Status";
import { NavLink } from "react-router-dom";

export default function LibraryPage({ user, library }) {
    const navigate = useNavigate();
    const mounted = useRef(true);
    var genKey = 100;
    function getKey() { genKey += 5; return genKey; }

    function LibraryItem({ item }) {
        return (
            <Row className="my-2">
                <Col key={getKey()} xs={5} md={4} lg={3}>
                    <Image fluid src={item.book.thumbnail_urls[2]} thumbnail onClick={() => navigate(`/book/${item.book.key}`)} />
                </Col>
                <Col key={getKey()} xs={7} md={8} lg={9}>
                    <div key={getKey()} className="h-100">
                        <h3>{item.book.title}</h3>
                        {/*<a href="/" key={a.key}>{a.name}</a> this was in NavLinks place below*/}
                        <p key={getKey()}>by: {item.book.authors.map((a, i) => [i > 0 && ", ", <NavLink to={`/?query=${a.name}&filter=author&limit=15`} end>{a.name}</NavLink>])}</p>
                        <p key={getKey()}>First published in: {item.book.first_publish_year}</p>
                        <Status bookId={item.book.key} mounted={mounted} isLoggedIn={!!user} inLibrary={item} />
                        <Rating bookId={item.book.key} mounted={mounted} isLoggedIn={!!user} inLibrary={item} />
                        <LibraryBtn singleKey={item.book.key} isLoggedIn={!!user} isLoaded={true} inLibrary={item} />
                    </div>
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
                        {library.library.map(item => <ListGroup.Item key={getKey()}><LibraryItem key={item.book.key} item={item} /></ListGroup.Item>)}
                    </ListGroup>
                    : <p key={getKey()}>Your library is empty. Add some books.</p>
                : <p key={getKey()}>Loading...</p>}
        </div>
    );
}