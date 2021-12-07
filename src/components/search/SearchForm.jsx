import { useState } from "react";
import { Button, Form, FormControl, FormSelect, InputGroup, FloatingLabel, FormGroup, FormLabel } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function SearchForm() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState(() => {
		const query = searchParams.get("query");
		return query ? query : "";
	});
	const [filter, setFilter] = useState(() => {
		const filter = searchParams.get("filter");
		return filter ? filter : "";
	});
	const [limit, setLimit] = useState(() => {
		const limit = searchParams.get("limit");
		return limit ? limit : "";
	});

	function handleSubmit(event) {
		event.preventDefault();
		if (!query) { setSearchParams(); return; }
		setSearchParams({
			"query": query,
			"filter": filter,
			"limit": limit
		})
	}

	return (
		<Form className="mb-3" onSubmit={handleSubmit}>
			<InputGroup className="mb-3">
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
						<option value="none">none</option>
						<option value="title">book</option>
						<option value="author">author</option>
						<option value="subject">subject</option>
						<option value="isbn">isbn</option>
					</FormSelect>
				</FloatingLabel>
				<Button disabled={query == null || query.length < 3} type="submit">Search</Button>
			</InputGroup>
			<FormGroup controlId="limit">
				<FormLabel>Results per page</FormLabel>
				<FormSelect
					className="w-25"
					name="limit"
					defaultValue={15}
					value={limit}
					aria-label="result limit per page"
					onChange={e => setLimit(e.target.value)}
				>
					<option value={5}>5</option>
					<option value={15}>15</option>
					<option value={25}>25</option>
				</FormSelect>
			</FormGroup>
		</Form>
	);
}
