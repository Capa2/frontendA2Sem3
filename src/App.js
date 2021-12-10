import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext, createContext } from "react";
import { Container } from "react-bootstrap";
import userFacade from "./auth/userFacade";
import apiFacade from "./apiFacade";
import NavBar from "./components/nav/NavBar";
import Hero from "./components/Hero";
// PAGES:
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LibraryPage from "./pages/LibraryPage";
import AdminPage from "./pages/AdminPage";
import NoMatchPage from "./pages/NoMatchPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import BookPage from "./pages/BookPage";
import SignupPage from "./pages/SignupPage";
import BestsellerPage from "./pages/BestsellerPage";

export const LibraryContext = createContext();

export default function App() {

  const navigate = useNavigate();
  const { login, logout, loggedIn, getUser } = userFacade();
  const [loggedInState, setLoggedInState] = useState(loggedIn());
  const [userState, setUserState] = useState(getUser());
  const [library, setLibrary] = useState();
  const mounted = useRef(true);

  function logoutProtocol() {
    if (loggedInState) setLoggedInState(false);
    logout();
    setUserState(null);
    setLibrary(null);
    navigate("/");
  }

  function loginProtocol(user, pass) {
    return login(user, pass)
      .then(res => {
        setUserState(res);
        if (!loggedInState) setLoggedInState(true);
        navigate("/library");
      });
  }

  /* function viewBook(book) {
    navigate("/book/" + book.title)
  } */

  useEffect(() => {
    document.title = "Booksave";
    return () => mounted.current = false;
  }, []);

  useEffect(() => {
    if (userState) apiFacade.fetchLibrary(setLibrary, mounted);
  }, [userState]);

  useEffect(() => {
    if (!loggedIn() && loggedInState) logoutProtocol();
  });

  return (
    <Container fluid="sm" className="wrapper">
      <Hero />
      <NavBar loggedIn={loggedInState} user={userState} />
      <Container className="pageContent pt-3 pb-3" fluid="sm">
        <LibraryContext.Provider value={[library, setLibrary]} >
          <Routes>
            <Route path="/*" element={<HomePage isLoggedIn={loggedInState} library={library} />} />
            <Route path="/library" element={<LibraryPage user={userState} library={library} />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/bestsellers" element={<BestsellerPage />} />
            <Route path="/login" element={<LoginPage login={loginProtocol} />} />
            <Route path="/logout" element={<LogoutPage logout={logoutProtocol} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/book/:key" element={<BookPage isLoggedIn={loggedInState} library={library} />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </LibraryContext.Provider>
      </Container>
    </Container>
  );
}
