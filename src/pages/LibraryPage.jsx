import { useEffect, useRef, useState } from "react";
import { Image, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import apiFacade from "../apiFacade";

export default function LibraryPage({ user }) {
    const [library, setLibrary] = useState();
    const mounted = useRef(true);
    function LibraryItem({ item }) {
        const [deleted, setDeleted] = useState();
        function delFromLibrary(event) {
            const key = event.target.value;
            apiFacade.delFromUserLibrary(key, mounted);
            setDeleted(true);
        }
        if (deleted) return null;
        return (
            <ListGroupItem>
                <Image src={item.book.thumbnail_urls[1]} className="float-start me-2" thumbnail />
                <h3>{item.book.title}</h3>
                <p>by: {item.book.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                <p>First published in: {item.book.first_publish_year}</p>
                <p>Status: {item.status}</p>
                <p>Rating: {item.rating}/5</p>
                <Button value={item.book.key} onClick={delFromLibrary} disabled={deleted}>{!deleted ? "Delete from library" : "Deleted"}</Button>
            </ListGroupItem>
        )
    }

    useEffect(() => {
        apiFacade.fetchUserLibrary(setLibrary, mounted);
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