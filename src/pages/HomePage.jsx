import SearchResults from "../components/search/SearchResults";
import SearchForm from "../components/search/SearchForm";

export default function Home() {

	return (
		<>
			<h2>Search books, authors and subjects</h2>
			<SearchForm />
			<SearchResults />
		</>
	);
}
