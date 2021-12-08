import { Button, Form, FormControl, FormSelect, InputGroup, FloatingLabel } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function SearchForm({query, setQuery, filter, setFilter, limit}) {
	const [, setSearchParams] = useSearchParams();

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
		</Form>
	);
}
