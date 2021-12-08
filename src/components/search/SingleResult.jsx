import { useNavigate } from "react-router";
import { Image, ListGroupItem } from "react-bootstrap";
import LibraryBtn from "../LibraryBtn";

function SingleResult({ singleResult, isLoggedIn }) {
    const navigate = useNavigate();
    return (
        <ListGroupItem>
            <Image src={singleResult.thumbnail_urls[1]} className="float-start me-2" thumbnail onClick={() => navigate(`/book/${singleResult.key}`)} />
            <h3>{singleResult.title}</h3>
            <p>by: {singleResult.authors.map((a, i) => [i > 0 && ", ", <a href="/" key={a.key}>{a.name}</a>])}</p>
            <p>First published in: {singleResult.first_publish_year}</p>
            <p>Page count: {singleResult.number_of_pages_median}</p>
            <p>{singleResult.subjects.map((s, i) => [i > 0 && ", ", <a href="/" key={s.key}>{s.name}</a>])}</p>
            <LibraryBtn bookId={singleResult.key} isLoggedIn={isLoggedIn} />
        </ListGroupItem>
    )
}

export default SingleResult;
