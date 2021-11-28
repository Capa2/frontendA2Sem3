import { SERVER_URL } from "../settings";
import handleHttpErrors from "../utils/handleHttpErrors";
import makeOptions from "../utils/makeOptions";
import tokenUtil from "./tokenUtil";

export default function userFacade() {
    const URL = `${SERVER_URL}/api`
    const { getToken, setToken, getUserFromToken } = tokenUtil();

    function login(user, pass) {
        const options = makeOptions("POST", false, { username: user, password: pass });
        return fetch(`${URL}/login`, options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token);
                return getUserFromToken(res.token);
            }).catch(err => {
                console.log(err);
                return null;
            });
    }

    function logout() {
        setToken(null);
    }

    function loggedIn(_token) {
        let isLoggedIn;
        try {
            const token = (_token) ? _token : getToken();
            isLoggedIn = !!token;
        }
        catch (err) { isLoggedIn = false; }
        return isLoggedIn;
    }

    function signup(user, pass) {
        const options = makeOptions("POST", false, { username: user, password: pass });
        return fetch(`${URL}/signup`, options)
            .then(handleHttpErrors)
            .then(res => { return res });
    }

    function getUser(_token) {
        const token = (_token) ? _token : getToken();
        return loggedIn(token) ? getUserFromToken(token) : null;
    }

    return {
        loggedIn,
        login,
        logout,
        signup,
        getUser,
    }
}
