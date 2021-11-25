import { useState } from "react"
import { Button, ButtonGroup, Dropdown, Form, FormControl, FormSelect, InputGroup } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryObject = Object.fromEntries(searchParams.entries());
    const [search, setSearch] = useState(queryObject);
    // ^ search could just initialise as query, but then it gives an annoying error message in console because the controlled value goes from undefined to defined.
    const navigate = useNavigate();

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        setSearch({ ...search, [key]: value });
    }

    function changeSearchType(event) {
        const newType = event.target.value;
        setSearch({ ...search, "type": newType });
    }

    function performSearch(event) {
        event.preventDefault();
        if (search.query) {

            let params = new URLSearchParams(search);

            navigate({
                pathname: "search",
                search: params.toString()
            });
        }
    }

    function getQueryString() {
        const { type, query } = queryObject;
        const res = (type ? type + ":" : "") + query;
        console.log(res);
        return res;
    }

    return <>
        <h1>Home</h1>
        <Form className="mb-3" onSubmit={performSearch}>
            <InputGroup>
                <FormControl name="query" type="text" value={search.query ? search.query : ""} onChange={handleChange} placeholder="Search for books" />
                <Dropdown as={ButtonGroup}>
                    <Button type="submit">Search</Button>
                    <Dropdown.Toggle split />
                    <Dropdown.Menu onClick={changeSearchType}>
                        <Dropdown.Item as="button" value="">Simple</Dropdown.Item>
                        <Dropdown.Item as="button" value="author">Author</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <InputGroup.Text>{search.type}</InputGroup.Text>
            </InputGroup>
        </Form>
        {queryObject.query &&
            <SearchResults query={getQueryString()} />
        }
    </>
}