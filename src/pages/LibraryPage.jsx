import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, ListGroup, ListGroupItem } from "react-bootstrap";
import LibraryBtn from "../components/LibraryBtn";
import apiFacade from "../apiFacade";
import Rating from "../components/rating/Rating";

export default function LibraryPage({ user }) {
    const [library, setLibrary] = useState();
    const navigate = useNavigate();
    const mounted = useRef(true);
    function LibraryItem({ item }) {
        return (
            <ListGroupItem>
                <Image src={item.book.thumbnail_urls[1]} className="float-start me-2" thumbnail onClick={() => navigate(`/book/${item.book.key}`)} />
                <h3>{item.book.title}</h3>
                <p>by: {item.book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                <p>First published in: {item.book.first_publish_year}</p>
                <p>Status: {item.status}</p>
                <Rating bookId={item.book.key} status={item.status} mounted={mounted} isLoggedIn={!!user} />
                <LibraryBtn bookId={item.book.key} isLoggedIn={!!user} passedLibrary={library} />
            </ListGroupItem>
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