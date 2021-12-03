import { useEffect, useRef, useState } from "react";
import { Button, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiFacade from "../../apiFacade";
import ResultStatus from "./ResultStatus";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState();
    const mounted = useRef(true);
    const navigate = useNavigate();


    function SingleResult({ result }) {
        // should maybe run a check on all books (after load for performance perhaps) to see if they're already in library.
        const [inLibrary, setInLibrary] = useState();

        function addToLibrary(event) {
            const key = event.target.value;
            apiFacade.addToUserLibrary(key, setInLibrary, mounted);
        }

        return (
            <ListGroupItem>
                <Image src={result.thumbnail_urls[1]} className="float-start me-2" thumbnail onClick={() => navigate(`/book/${result.key}`)} />
                <h3>{result.title}</h3>
                <p>by: {result.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                <p>First published in: {result.first_publish_year}</p>
                <p>Page count: {result.number_of_pages_median}</p>
                <p>{result.subjects.map((s, i) => [i > 0 && ", ", <a href="/" key={s.key}>{s.name}</a>])}</p>
                <Button value={result.key} onClick={addToLibrary} disabled={inLibrary}>{!inLibrary ? "Add to library" : "Already in library"}</Button>
            </ListGroupItem>
        )
    }

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        setSearchResults(null);
        function buildQueryFromParams() {
            const query = searchParams.get("query");
            const filter = searchParams.get("filter");
            if (filter === "none" || filter === "null" || !filter) return query;
            return filter + ":" + query;
        }
        if (searchParams.has("query")) apiFacade.fetchSearchResults(buildQueryFromParams(searchParams), setSearchResults, mounted);
    }, [searchParams]);

    if (!searchResults) {
        return <ResultStatus result={searchResults} />
    }

    return (
        <div>
            <ResultStatus result={searchResults} />
            <ListGroup>
                {searchResults.results.map(r => <SingleResult key={r.key} result={r} />)}
            </ListGroup>
        </div>
    );
}

export default SearchResults;