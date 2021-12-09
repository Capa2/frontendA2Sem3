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

function addToLibrary(key, callback, mounted) {
    fetchData(`${SERVER_URL}/api/library/add/${key}`, "POST", callback, mounted, true);

}

function getLibraryItem(key, setItem, mounted) {
    fetchData(`${SERVER_URL}/api/library/get/${key}`, "GET", setItem, mounted, true);
}

function editRating(key, rating, callback, mounted) {
    fetchData(`${SERVER_URL}/api/library/edit/${key}/rating/${rating}`, "PUT", callback, mounted, true);
}

function editStatus(key, status, callback, mounted) {
    fetchData(`${SERVER_URL}/api/library/edit/${key}/status/${status}`, "PUT", callback, mounted, true);
}

function delFromLibrary(key, callback, mounted) {
    fetchData(`${SERVER_URL}/api/library/delete/${key}`, "DELETE", callback, mounted, true);
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
    getLibraryItem,
    editRating,
    editStatus,
    addToLibrary,
    delFromLibrary,
    fetchLibrary,
    fetchAdminPage
}

export default apiFacade;
