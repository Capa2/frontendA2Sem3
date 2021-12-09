import { useContext } from "react";
import { LibraryContext } from "../App";
import SearchModule from "../components/search/SearchModule";

export default function Home({ isLoggedIn, library }) {
	const [lib] = useContext(LibraryContext);
	if (lib) console.log({ lib });

	return (
		<>
			<h2>Search books, authors and subjects</h2>
			<SearchModule isLoggedIn={isLoggedIn} library={library} />
		</>
	);
}
