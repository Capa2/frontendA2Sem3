import { useEffect, useRef, useState } from "react";
import { Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiFacade from "../../apiFacade";
import LibraryBtn from "../LibraryBtn";
import PaginationBar from "../PaginationBar";
import ResultStatus from "./ResultStatus";

function SearchResults({ isLoggedIn }) {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState();
    const mounted = useRef(true);
    const navigate = useNavigate();


    function SingleResult({ result }) {

        return (
            <ListGroupItem>
                <Image src={result.thumbnail_urls[1]} className="float-start me-2" thumbnail onClick={() => navigate(`/book/${result.key}`)} />
                <h3>{result.title}</h3>
                <p>by: {result.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
                <p>First published in: {result.first_publish_year}</p>
                <p>Page count: {result.number_of_pages_median}</p>
                <p>{result.subjects.map((s, i) => [i > 0 && ", ", <a href="/" key={s.key}>{s.name}</a>])}</p>
                <LibraryBtn bookId={result.key} isLoggedIn={isLoggedIn} />

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
            let filter = searchParams.get("filter");
            filter = !(filter === "none" || filter === "null" || !filter) ? `${filter}:` : "";
            let offset = searchParams.get("offset");
            offset = offset != null ? `?offset=${offset}` : "";
            return filter + query + offset;
        }
        if (searchParams.has("query")) apiFacade.fetchSearchResults(buildQueryFromParams(searchParams), setSearchResults, mounted);
    }, [searchParams]);

    if (!searchResults) {
        return <ResultStatus result={searchResults} />
    }

    return (
        <div>
            <ResultStatus result={searchResults} />
            <PaginationBar result={searchResults} />
            <ListGroup>
                {searchResults.results.map(r => <SingleResult key={r.key} result={r} />)}
            </ListGroup>
        </div>
    );
}

export default SearchResults;