import { useEffect } from 'react';
import { createContext, useState, useRef } from 'react';
import apiFacade from '../apiFacade';

const LibraryContext = createContext(null);

function LibraryProvider({ isLoggedIn, children }) {
    const mounted = useRef(true);
    const [library, setLibrary] = useState();

    function fetch() {
        if (isLoggedIn) apiFacade.fetchLibrary(setLibrary, mounted);
        else setLibrary(null);
        setTimeout(fetch, 1000 * 60 * 60 * 1); // 1 hour
    }

    useEffect(() => {
        fetch();
        return () => mounted.current = false;
    }, [isLoggedIn]);

    return <LibraryContext.Provider value={library}>{children}</LibraryContext.Provider>
}

export { LibraryContext, LibraryProvider };