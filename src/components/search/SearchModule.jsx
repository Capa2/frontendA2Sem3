import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiFacade from "../../apiFacade";
import SearchResults from "./SearchResults";
import SearchForm from "./SearchForm";
import PaginationBar from "./PaginationBar";
import ResultStatus from "./ResultStatus";
import ResultLimiter from "./ResultLimiter";
import { Row, Col } from "react-bootstrap";

function SearchModule({ isLoggedIn }) {
    const [searchParams] = useSearchParams();
    const mounted = useRef(true);
    const [library, setLibrary] = useState();
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        if (isLoggedIn) apiFacade.fetchLibrary(setLibrary, mounted);
        return () => mounted.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [query, setQuery] = useState(() => {
        const query = searchParams.get("query");
        return query ? query : "";
    });
    const [filter, setFilter] = useState(() => {
        const filter = searchParams.get("filter");
        return filter ? filter : "";
    });

    const [limit, setLimit] = useState(() => {
        const limit = searchParams.get("limit");
        return limit ? limit : 15;
    });

    return (
        <>
            <Row>
                <SearchForm query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} limit={limit} />
            </Row>
            <Row>
                <Col><ResultStatus searchResult={searchResult} /></Col>
                <Col><PaginationBar searchResult={searchResult} /></Col>
                <Col><ResultLimiter query={query} filter={filter} limit={limit} setLimit={setLimit} /></Col>
            </Row>
            <Row><SearchResults library={library} searchResult={searchResult} setSearchResult={setSearchResult} isLoggedIn={isLoggedIn} /></Row>
        </>
    );
}

export default SearchModule;