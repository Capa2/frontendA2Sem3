import { useEffect, useState } from "react";
import { FormSelect } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function Status({ bookId, mounted, isLoggedIn, inLibrary }) {
    const [status, setStatus] = useState();

    useEffect(() => {
        if (inLibrary) {
            setStatus(inLibrary.status);
        }
    }, [inLibrary]);


    useEffect(() => {
        if (inLibrary && status) apiFacade.editStatus(bookId, status, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    if (!isLoggedIn || !inLibrary) return null;

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