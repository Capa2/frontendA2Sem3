import { useContext } from "react";
import { LibraryContext } from "../App";
import SearchModule from "../components/search/SearchModule";
import NYT from "../components/NYT/NytModule";

export default function Home({ isLoggedIn }) {
	const [library] = useContext(LibraryContext);

	return (
		<>
			<h2>Search books, authors and subjects</h2>
			<SearchModule isLoggedIn={isLoggedIn} library={library} />
			<NYT isLoggedIn={isLoggedIn} />
		</>
	);
}
