import handleHttpErrors from "../utils/handleHttpErrors";
import makeOptions from "../utils/makeOptions";

// mounted fixes a possible memory leak when swithcing away from a page before the fetch completes.
// but currently it's passed all the way from the Page and there might be nicer way than passing it along so many times.
function fetchData(url, method, callback, mounted, addToken, body) {
    const options = makeOptions(method, addToken, body); // boolean addToken add's the logged in user token
    return fetch(url, options).then(handleHttpErrors).then(data => {
        if (mounted.current) {
            callback(data)
        }
    }); // catch
}

export default fetchData;
