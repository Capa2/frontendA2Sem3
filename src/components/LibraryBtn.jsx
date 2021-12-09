import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import apiFacade from "../apiFacade";
import { LibraryContext } from "../App";

function LibraryBtn({ singleKey, isLoggedIn, isLoaded, inLibrary }) {
    const [library, setLibrary] = useContext(LibraryContext);
    const [exists, setExists] = useState(!!inLibrary);
    const mounted = useRef(true);

    useEffect(() => {
        setExists(!!inLibrary);
    }, [inLibrary]);

    function addToLibrary() {
        if (isLoggedIn) {
            apiFacade.addToLibrary(singleKey, () => {
                apiFacade.fetchLibrary(setLibrary, mounted);
            }, mounted);
        }
    }

    function delFromLibrary() {
        if (isLoggedIn) {
            apiFacade.delFromLibrary(singleKey, () => {
                // setLibrary({ ...library, "library": library.library.filter(item => item.book.key !== singleKey) });
                apiFacade.fetchLibrary(setLibrary, mounted);
            }, mounted);
        }
    }

    if (!isLoggedIn) return null;

    return (
        <Button
            variant={!exists ? "success" : "danger"}
            className="m-1"
            value={singleKey}
            disabled={!isLoaded || !isLoggedIn}
            onClick={!exists ? addToLibrary : delFromLibrary}
        >{!isLoaded ? "loading.." :
            !exists ? "save" : "unsave"}
        </Button>
    );
}

export default LibraryBtn;