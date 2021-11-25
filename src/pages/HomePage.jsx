import { useState } from "react"
import { Button, ButtonGroup, Dropdown, Form, FormControl, FormSelect, InputGroup } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [search, setSearch] = useState(!!query ? query : "");
    const [searchType, setSearchType] = useState();
    // ^ search could just initialise as query, but then it gives an annoying error message in console because the controlled value goes from undefined to defined.
    const navigate = useNavigate();

    function handleChange(event) {
        setSearch(event.target.value);
    }

    function handleSearchType(event) {
        const type = event.target.value;
        setSearchType(type);
        console.log("selected search type ", type);
        console.log("Search type state is ", searchType);
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
                    size="lg"
                    onChange={handleChange}
                    placeholder="Search"
                />
                <Form.Select
                    defaultValue={searchType}
                    size="lg"
                    aria-label="search select"
                    onChange={handleSearchType}
                >
                    <option value="book">book</option>
                    <option value="author">author</option>
                </Form.Select>
                <Button type="submit">Search</Button>
                {/*  
                !! This seems needlessly complicated and hides away critical information from the user !!
                <Dropdown as={ButtonGroup}>
                    <Button type="submit">Search</Button>
                    <Dropdown.Toggle split />
                    <Dropdown.Menu onClick={changeSearchType}>
                        <Dropdown.Item as="button" value="">Simple</Dropdown.Item>
                        <Dropdown.Item as="button" value="author:">Author</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <InputGroup.Text>{searchType}</InputGroup.Text>
                */}
            </InputGroup>
        </Form>
        {query &&
            <row><SearchResults query={query} /></row>
        }
    </>
}