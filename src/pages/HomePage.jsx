import { useRef, useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { Route, Routes, useNavigate } from "react-router";

export default function Home() {
    const [searchResults, setSearchResults] = useState();
    const mounted = useRef(true);
    const navigate = useNavigate();

    function search(event) {
        event.preventDefault();
        const query = event.target.search.value;
        if (query) {
            navigate(`search/${query}`);
        }
    }

    return <>
        <h1>Home</h1>
        <Form className="mb-3" onSubmit={search}>
            <InputGroup>
                <FormControl name="search" type="text" placeholder="Search for books" />
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
        <Routes>
            <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
    </>
}