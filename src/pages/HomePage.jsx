import SearchModule from "../components/search/SearchModule";

export default function Home({ isLoggedIn }) {

	return (
		<>
		<h2>Search books, authors and subjects</h2>
		<SearchModule isLoggedIn={isLoggedIn} />
		</>
	);
}
