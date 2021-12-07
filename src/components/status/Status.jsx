import { useEffect, useState } from "react";
import { FormSelect } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function Status({ bookId, mounted, isLoggedIn }) {
    const [status, setStatus] = useState();
    const [libraryItem, setLibraryItem] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        apiFacade.getLibraryItem(bookId, setLibraryItem, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (libraryItem) {
            setStatus(libraryItem.status ? libraryItem.status : "not");
            setLoaded(true);
        }
    }, [libraryItem]);


    useEffect(() => {
        if (loaded) apiFacade.editStatus(bookId, status, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    if (!isLoggedIn) return null;

    return (
        <FormSelect
            name="status"
            value={status}
            aria-label="book status"
            onChange={e => setStatus(e.target.value)}
            className="my-2"
        >
            <option value="not">not reading</option>
            <option value="want">want to read</option>
            <option value="reading">reading</option>
            <option value="read">read</option>
        </FormSelect>
    );
}

export default Status;