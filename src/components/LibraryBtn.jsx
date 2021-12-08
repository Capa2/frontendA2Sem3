import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import apiFacade from "../apiFacade";

function LibraryBtn({ bookId, isLoggedIn, inLibrary }) {
    const [exists, setExists] = useState(!!inLibrary);
    const mounted = useRef(true);
    console.log(inLibrary);
    console.log(exists);

    useEffect(() => {
        setExists(!!inLibrary);
        return () => mounted.current = false;
    }, []);

    function addToLibrary() {
        if (isLoggedIn) apiFacade.addToLibrary(bookId, setExists, mounted);
    }

    function delFromLibrary() {
        if (isLoggedIn) apiFacade.delFromLibrary(bookId, setExists, mounted);
    }

    if (!isLoggedIn) return null;

    return (
        <Button value={bookId} disabled={!isLoggedIn} onClick={!exists ? addToLibrary : delFromLibrary}>
            {!isLoggedIn ? "Login to save books" : !exists ? "Add to library" : "Delete from library"}
        </Button>
    );
}

export default LibraryBtn;