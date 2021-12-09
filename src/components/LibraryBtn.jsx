import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import apiFacade from "../apiFacade";

function LibraryBtn({ singleKey, isLoggedIn, isLoaded, inLibrary }) {
    const [exists, setExists] = useState(!!inLibrary);
    const mounted = useRef(true);

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        setExists(!!inLibrary);
    }, [inLibrary]);

    function addToLibrary() {
        if (isLoggedIn) apiFacade.addToLibrary(singleKey, setExists, mounted);
    }

    function delFromLibrary() {
        if (isLoggedIn) apiFacade.delFromLibrary(singleKey, setExists, mounted);
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