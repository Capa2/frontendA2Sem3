import { ListGroup } from "react-bootstrap";
import SingleResult from "./SingleResult";
import buildQueryFromParams from "./utils/queryBuilder";
import apiFacade from "../../apiFacade";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function SearchResults({ library, searchResult, setSearchResult, isLoggedIn }) {
    const mounted = useRef(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        if (searchParams.has("query")) apiFacade.fetchSearchResults(buildQueryFromParams(searchParams), setSearchResult, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    if (!searchResult) return null;

    return (
        <>
            <ListGroup>
                {searchResult.results.map(singleResult => <SingleResult library={library} key={singleResult.key} singleResult={singleResult} isLoggedIn={isLoggedIn} />)}
            </ListGroup>
        </>
    );
}

export default SearchResults;