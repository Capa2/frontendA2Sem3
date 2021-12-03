import SearchResults from "../components/search/SearchResults";
import SearchForm from "../components/search/SearchForm";
import Rating from "../components/Rating";
export default function Home({isLoggedIn}) {

	return (
		<>
			<h2>Search books, authors and subjects</h2>
			<SearchForm  />
			<SearchResults isLoggedIn={isLoggedIn} />
		</>
	);
}
