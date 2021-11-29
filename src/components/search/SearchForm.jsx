import { useState } from "react";
import { Button, Form, FormControl, FormSelect, InputGroup, FloatingLabel, Row } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { useSearchParams } from "react-router-dom";

export default function SearchForm() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState(searchParams.get("query"));
	const [filter, setFilter] = useState(searchParams.get("filter"));

	function handleSubmit(event) {
		event.preventDefault();
		if (!query) { setSearchParams(); return; }
		setSearchParams({
			"query": query,
			"filter": filter,
		})
	}

	function getQueryString() {
		const query = searchParams.get("query");
		const filter = searchParams.get("filter");
		if (filter == "none") return query;
		return filter + ":" + query;
	}

	return (
		<>
			<h2>Search for {filter ? filter + "s" : "anything"}</h2>
			<Form className="mb-3" onSubmit={handleSubmit}>
				<InputGroup>
					<FormControl
						className="searchInput w-66"
						name="query"
						type="text"
						value={query}
						onChange={e => setQuery(e.target.value)}
						placeholder="Search"
					/>
					<FloatingLabel controlId="floatingFilter" label="Filter">
						<FormSelect
							name="filter"
							value={filter}
							aria-label="search filter"
							onChange={e => setFilter(e.target.value)}
						>
							{/* The empty value is to use the API's generic search as opposed to forcing it to match title. */}
							<option value="none">none</option>
							<option value="title">book</option>
							<option value="author">author</option>
							<option value="subject">subject</option>
						</FormSelect>
					</FloatingLabel>
					<Button disabled={false && query == null && query.length < 3} type="submit">Search</Button>
				</InputGroup>
			</Form>
			{searchParams.has("query") && (
				<Row>
					<SearchResults query={getQueryString()} />
				</Row>
			)}
		</>
	);
}
