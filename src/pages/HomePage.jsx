import { useRef, useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import apiFacade from "../apiFacade";

export default function Home() {
    const [searchResults, setSearchResults] = useState();
    const mounted = useRef(true);

    function search(event) {
        event.preventDefault();
        const query = event.target.search.value;
        apiFacade.fetchSearchResults(query, setSearchResults, mounted);
    }

    return <>
        <h1>Home</h1>
        <Form className="mb-3" onSubmit={search}>
            <InputGroup>
                <FormControl name="search" type="text" placeholder="Search for books" />
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
        <SearchResults results={searchResults} />
    </>
}