import { useState } from "react"
import { Button, Form, FormControl, FormSelect, InputGroup, Row } from "react-bootstrap";
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
        return res;
    }

    return <>
        <h1>Home</h1>

        <Form className="mb-3" onSubmit={performSearch}>
            <InputGroup>
                <FormControl
                    className="w-66"
                    name="query"
                    type="text"
                    value={search.query ? search.query : ""}
                    size="lg"
                    onChange={handleChange}
                    placeholder="Search"
                />
                <FormSelect
                    name="type"
                    defaultValue={search.type}
                    size="lg"
                    aria-label="search select"
                    onChange={handleChange}
                >
                    {/* The empty value is to use the API's generic search as opposed to forcing it to match title. */}
                    <option value="">book</option>
                    <option value="author">author</option>
                </FormSelect>
                <Button type="submit">Search</Button>
                {/*  
                !! This seems needlessly complicated and hides away critical information from the user !!
                <Dropdown as={ButtonGroup}>
                    <Button type="submit">Search</Button>
                    <Dropdown.Toggle split />
                    <Dropdown.Menu onClick={changeSearchType}>
                        <Dropdown.Item as="button" value="">Simple</Dropdown.Item>
                        <Dropdown.Item as="button" value="author">Author</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <InputGroup.Text>{searchType}</InputGroup.Text>
                */}
            </InputGroup>
        </Form>
        {queryObject.query &&
            <Row><SearchResults query={getQueryString()} /></Row>
        }
    </>
}