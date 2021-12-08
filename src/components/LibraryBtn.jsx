import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import apiFacade from "../apiFacade";

function LibraryBtn({ bookId, isLoggedIn, passedLibrary }) {
    const [library, setLibrary] = useState(passedLibrary);
    const [IsLoaded, setIsLoaded] = useState(false);
    const [exists, setExists] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        if (!passedLibrary && isLoggedIn) {
            apiFacade.fetchLibrary(setLibrary, mounted);
        }
        else {
            setLibrary(passedLibrary);
            setIsLoaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passedLibrary]);

    useEffect(() => {
        if (!library || !bookId) {
            setIsLoaded(false);
        } else {
            for (var i = 0; i <= library.size; i++) { // note <= final loop set false
                if (i === library.size) {
                    setExists(false);
                } else if (library.library[i].book.key === bookId) {
                    setExists(true);
                    break;
                }
            }
            setIsLoaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [library, bookId]);

    function addToLibrary() {
        if (isLoggedIn) apiFacade.addToLibrary(bookId, setExists, mounted);
    }

    function delFromLibrary() {
        if (isLoggedIn) apiFacade.delFromLibrary(bookId, setExists, mounted);
    }

    if (!isLoggedIn) return null;

    return (
        <Button value={bookId} disabled={!IsLoaded || !isLoggedIn} onClick={!exists ? addToLibrary : delFromLibrary}>
            {!isLoggedIn ? "Login to save books" : !IsLoaded ? "Checking Library.. " : !exists ? "Add to library" : "Delete from library"}
        </Button>
    );
}

export default LibraryBtn;