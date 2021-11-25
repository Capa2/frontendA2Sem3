import { useRef, useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { Route, Routes, useNavigate } from "react-router";
import { createSearchParams, useSearchParams } from "react-router-dom";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [search, setSearch] = useState(query);
    const [searchResults, setSearchResults] = useState();
    const mounted = useRef(true);
    const navigate = useNavigate();

    function handleChange(event) {
        setSearch(event.target.value);
    }

    function performSearch(event) {
        event.preventDefault();
        if (search) {
            navigate({
                pathname: "search",
                search: `query=${search}`
            });
        }
    }

    return <>
        <h1>Home</h1>
        <Form className="mb-3" onChange={handleChange} onSubmit={performSearch}>
            <InputGroup>
                <FormControl name="search" type="text" value={search} placeholder="Search for books" />
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
        {query &&
            <SearchResults query={query} />
        }
    </>
}