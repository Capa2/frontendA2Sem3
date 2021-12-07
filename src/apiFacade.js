import { SERVER_URL } from "./settings";
import fetchData from "./utils/fetchData";

function fetchSearchResults(query, setSearchResults, mounted) {
    fetchData(`${SERVER_URL}/api/search/${query}`, "GET", setSearchResults, mounted);
}

function fetchBookDetails(key, setBook, mounted) {
    fetchData(`${SERVER_URL}/api/book/${key}`, "GET", setBook, mounted);
}

function fetchUserPage(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/info/user`, "GET", setContent, mounted, true);
}

function addToLibrary(key, setExists, mounted) {
    function tellMe() {
        setExists(true); // TODO: validate add to library
    }
    fetchData(`${SERVER_URL}/api/library/add/${key}`, "POST", tellMe, mounted, true);

}

function editLibrary(key, rating, status, mounted) {
    function tellMe(res) {
        console.log({ res }); // TODO: validate
    }
    const body = {
        "bookKey": key,
        "rating": rating,
        "status": status,
    }

    fetchData(`${SERVER_URL}/api/library/edit/${key}`, "PUT", tellMe, mounted, true, body);
}

function delFromLibrary(key, setExists, mounted) {
    function tellMe() {
        setExists(false); // TODO: validate delete from library
    }
    fetchData(`${SERVER_URL}/api/library/delete/${key}`, "DELETE", tellMe, mounted, true);
}


function fetchLibrary(setLibrary, mounted) {
    fetchData(`${SERVER_URL}/api/library/get`, "GET", setLibrary, mounted, true);
}

function fetchAdminPage(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/info/admin`, "GET", setContent, mounted, true);
}

const apiFacade = {
    fetchSearchResults,
    fetchBookDetails,
    fetchUserPage,
    editLibrary,
    addToLibrary,
    delFromLibrary,
    fetchLibrary,
    fetchAdminPage
}

export default apiFacade;
