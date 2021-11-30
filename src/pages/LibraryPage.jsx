import { useEffect, useRef, useState } from "react";
import apiFacade from "../apiFacade";

export default function LibraryPage() {
    const [content, setContent] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.fetchUserPage(setContent, mounted);
        return () => mounted.current = false;
    }, []);

    return (
        <div>
            {content
                ? <h1>{content.msg}</h1>
                : <p>Loading...</p>}
        </div>
    );
}