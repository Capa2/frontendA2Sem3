import { useEffect, useRef, useState } from "react";
import { Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { useParams } from "react-router";
import apiFacade from "../apiFacade";

function SearchResults() {
    const [searchResults, setSearchResults] = useState();
    const { query } = useParams();
    const mounted = useRef(true);

    function SingleResult({ result }) {
        return (
            <ListGroupItem>
                <Image src={result.thumbnail_urls[1]} className="float-start me-2" thumbnail />
                <h2>{result.title}</h2>
                <p>by: {result.authors.map((a, i) => [i > 0 && ", ", <a href="#" key={a.key}>{a.name}</a>])}</p>
                <p>First published in: {result.first_publish_year}</p>
                <p>Median page count: {result.number_of_pages_median}</p>
                <p>{result.subjects.map((s, i) => [i > 0 && ", ", <a href="#" key={s.key}>{s.name}</a>])}</p>
            </ListGroupItem>
        )
    }

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    useEffect(() => {
        apiFacade.fetchSearchResults(query, setSearchResults, mounted);
    }, [query])

    if (!searchResults) {
        return null;
    }

    return (
        <div>
            {searchResults.numFound > 0
                ? <p>Results: {searchResults.numFound}</p>
                : <p>No results</p>}
            <ListGroup>
                {searchResults.results.map(r => <SingleResult key={r.key} result={r} />)}
            </ListGroup>
        </div>
    );
}

export default SearchResults;