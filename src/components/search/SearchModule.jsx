import { useRef, useState, useEffect } from "react";
import apiFacade from "../../apiFacade";
import SearchResults from "./SearchResults";
import SearchForm from "./SearchForm";
import PaginationBar from "./PaginationBar";
import ResultStatus from "./ResultStatus";

function SearchModule({ isLoggedIn, library }) {
    const [searchResult, setSearchResult] = useState();

    return (
        <>
            <SearchForm />
            <ResultStatus searchResult={searchResult} />
            <PaginationBar searchResult={searchResult} />
            <SearchResults library={library} searchResult={searchResult} setSearchResult={setSearchResult} isLoggedIn={isLoggedIn} />
        </>
    );
}

export default SearchModule;