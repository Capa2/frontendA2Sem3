import { useRef, useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { Route, Routes, useNavigate } from "react-router";
import { createSearchParams, useSearchParams } from "react-router-dom";

export default function Home() {
    const [searchResults, setSearchResults] = useState();
    const mounted = useRef(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("query");

    function search(event) {
        event.preventDefault();
        const query = event.target.search.value;
        if (query) {
            navigate({
                pathname: "search",
                search: `query=${query}`
            });
        }
    }

    return <>
        <h1>Home</h1>
        <Form className="mb-3" onSubmit={search}>
            <InputGroup>
                <FormControl name="search" type="text" value={queryParam} placeholder="Search for books" />
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
        {queryParam &&
            <SearchResults query={queryParam} />
        }
    </>
}