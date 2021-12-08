import { useRef, useState, useEffect } from "react";
import apiFacade from "../../apiFacade";
import SearchResults from "./SearchResults";
import SearchForm from "./SearchForm";
import PaginationBar from "./PaginationBar";
import ResultStatus from "./ResultStatus";

function SearchModule({ isLoggedIn }) {
    const mounted = useRef(true);
    const [library, setLibrary] = useState();
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        if (isLoggedIn) apiFacade.fetchLibrary(setLibrary, mounted);
        return () => mounted.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SearchForm />
            <ResultStatus searchResult={searchResult} />
            <PaginationBar searchResult={searchResult} />
            <SearchResults library={library} searchResult={searchResult} setSearchResult={setSearchResult} isLoggedIn={isLoggedIn} />
        </>
    );
}

export default SearchModule;