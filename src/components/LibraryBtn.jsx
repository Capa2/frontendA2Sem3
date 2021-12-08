import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import apiFacade from "../apiFacade";

function LibraryBtn({ bookId, isLoggedIn, isLoaded, inLibrary }) {
    const [exists, setExists] = useState(!!inLibrary);
    const mounted = useRef(true);

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        setExists(!!inLibrary);
    }, [inLibrary]);

    function addToLibrary() {
        if (isLoggedIn) apiFacade.addToLibrary(bookId, setExists, mounted);
    }

    function delFromLibrary() {
        if (isLoggedIn) apiFacade.delFromLibrary(bookId, setExists, mounted);
    }

    if (!isLoggedIn) return null;

    return (
        <Button value={bookId} disabled={!isLoggedIn || !isLoaded} onClick={!exists ? addToLibrary : delFromLibrary}>
            {!isLoggedIn ? "Login to save books" : !isLoaded ? "Loading..." : !exists ? "Add to library" : "Delete from library"}
        </Button>
    );
}

export default LibraryBtn;