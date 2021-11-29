import { useState } from "react";
import { Button, Form, FormControl, FormSelect, InputGroup, FloatingLabel, Row } from "react-bootstrap";
import SearchResults from "../components/SearchResults";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../components/search/searchForm";

export default function Home() {
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
			<SearchForm
				query={query}
				setQuery={setQuery}
				filter={filter}
				setFilter={setFilter}
				searchParams={searchParams}
				setSearchParams={setSearchParams}
			></SearchForm>
			{searchParams.has("query") && (
				<Row>
					<SearchResults query={getQueryString()} />
				</Row>
			)}
		</>
	);
}
