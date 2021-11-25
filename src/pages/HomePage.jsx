import { useState } from "react"
import { Button, Form, FormControl, InputGroup, Row, Col } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [search, setSearch] = useState(!!query ? query : "");
    // ^ search could just initialise as query, but then it gives an annoying error message in console because the controlled value goes from undefined to defined.
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

        <Form className="mb-3" onSubmit={performSearch}>
            <InputGroup>
                <FormControl
                    className="w-66"
                    name="search"
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search"
                />
                <Form.Select 
                    size="lg"
                    aria-label="search select"
                >
                    <option value="book">book</option>
                    <option value="author">author</option>
                </Form.Select>
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
        {query &&
            <row><SearchResults query={query} /></row>
        }
    </>
}