import { ListGroup } from "react-bootstrap";
import SingleResult from "./SingleResult";
import buildQueryFromParams from "./utils/queryBuilder";
import apiFacade from "../../apiFacade";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function SearchResults({ searchResult, setSearchResult, isLoggedIn, library }) {
    const mounted = useRef(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        if (searchParams.has("query")) apiFacade.fetchSearchResults(buildQueryFromParams(searchParams), setSearchResult, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    function getLibraryItem(key) {
        return library.library.find(item => item.book.key === key);
    }

    if (!searchResult) return null;

    return (
        <>
            <ListGroup>
                {searchResult.results.map(singleResult => <SingleResult key={singleResult.key} singleResult={singleResult} isLoggedIn={isLoggedIn} inLibrary={getLibraryItem(singleResult.key)} />)}
            </ListGroup>
        </>
    );
}

export default SearchResults;