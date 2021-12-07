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
    function added() {
        setExists(true); // TODO: validate add to library
    }
    fetchData(`${SERVER_URL}/api/library/add/${key}`, "POST", added, mounted, true);

}

function getLibraryItem(key, setItem, mounted) {
    fetchData(`${SERVER_URL}/api/library/get/${key}`, "GET", setItem, mounted, true);
}

function editRating(key, rating, mounted) {
    function tellMe(res) {
        //console.log({ res }); // TODO: validate
    }
    fetchData(`${SERVER_URL}/api/library/edit/${key}/rating/${rating}`, "PUT", tellMe, mounted, true);
}

function editStatus(key, status, mounted) {
    function tellMe(res) {
        //console.log({ res }); // TODO: validate
    }
    fetchData(`${SERVER_URL}/api/library/edit/${key}/status/${status}`, "PUT", tellMe, mounted, true);
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
    getLibraryItem,
    editRating,
    editStatus,
    addToLibrary,
    delFromLibrary,
    fetchLibrary,
    fetchAdminPage
}

export default apiFacade;
