import { SERVER_URL } from "./settings";
import fetchData from "./utils/fetchData";

function fetchSearchResults(query, setSearchResults, mounted) {
    fetchData(`${SERVER_URL}/api/search/${query}`, "GET", setSearchResults, mounted);
}

function fetchUserPage(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/info/user`, "GET", setContent, mounted, true);
}

function addToUserLibrary(key, setInLibrary, mounted) {
    fetchData(`${SERVER_URL}/api/library/add/${key}`, "POST", setInLibrary, mounted, true);
}

function delFromUserLibrary(key, mounted) {
    function doNothing() { console.log("deleting", key) };
    fetchData(`${SERVER_URL}/api/library/delete/${key}`, "DELETE", doNothing, mounted, true);
}


function fetchUserLibrary(setLibrary, mounted) {
    fetchData(`${SERVER_URL}/api/library/get`, "GET", setLibrary, mounted, true);
}

function fetchAdminPage(setContent, mounted) {
    fetchData(`${SERVER_URL}/api/info/admin`, "GET", setContent, mounted, true);
}

const apiFacade = {
    fetchSearchResults,
    fetchUserPage,
    addToUserLibrary,
    delFromUserLibrary,
    fetchUserLibrary,
    fetchAdminPage
}

export default apiFacade;
