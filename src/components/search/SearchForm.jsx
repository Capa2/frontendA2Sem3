import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { Button, Form, FormControl, FormSelect, InputGroup, FloatingLabel } from "react-bootstrap";

export default function SearchForm() {
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

	function handleSubmit(event) {
		event.preventDefault();
		if (search.query) {
			let params = new URLSearchParams(search);

			navigate({
				pathname: "search",
				search: params.toString(),
			});
		}
	}

	function getQueryString() {
		const { type, query } = queryObject;
		const res = (type ? type + ":" : "") + query;
		return res;
	}

	return (
		<>
			<h2>Search for {searchParams.get("type") ? searchParams.get("type") + "s" : "anything"}</h2>
			<Form className="mb-3" onSubmit={handleSubmit}>
				<InputGroup>
					<FormControl
						className="searchInput w-66"
						name="query"
						type="text"
						value={search.query ? search.query : ""}

						onChange={handleChange}
						placeholder="Search"
					/>
					<FloatingLabel controlId="floatingFilter" label="Filter">
						<FormSelect
							name="type"
							defaultValue={search.type}
							aria-label="search type"
							onChange={handleChange}
						>
							{/* The empty value is to use the API's generic search as opposed to forcing it to match title. */}
							<option value="">none</option>
							<option value="title">book</option>
							<option value="author">author</option>
							<option value="subject">subject</option>
						</FormSelect>
					</FloatingLabel>
					<Button disabled={search.query == null || search.query.length < 3} type="submit">Search</Button>
				</InputGroup>
			</Form>
		</>
	);
}
