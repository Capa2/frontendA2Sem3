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
        if (!passedLibrary) {
            console.log("I am a button and I fetched Lib myself");
            apiFacade.fetchLibrary(setLibrary, mounted);
        }
        else {
            setLibrary(passedLibrary);
            setIsLoaded(true);
        }
    }, [passedLibrary]);

    useEffect(() => {
        if (!library || !bookId) {
            setIsLoaded(false);
        } else {

            for (var i = 0; i <= library.size; i++) { // note <= final loop set false
                if (i == library.size) {
                    setExists(false);
                } else if (library.library[i].book.key == bookId) {
                    setExists(true);
                    break;
                }
            }
            setIsLoaded(true);
        }
    }, [library, bookId]);

    function addToLibrary() {
        apiFacade.addToLibrary(bookId, setExists, mounted);
    }

    function delFromLibrary() {
        apiFacade.delFromLibrary(bookId, setExists, mounted);
    }

    return (
        <Button value={bookId} disabled={!IsLoaded || !isLoggedIn} onClick={!exists ? addToLibrary : delFromLibrary}>
            {!isLoggedIn ? "Login to save books" : !IsLoaded ? "Checking Library.. " : !exists ? "Add to library" : "Delete from library"}
        </Button>
    );
}

export default LibraryBtn;