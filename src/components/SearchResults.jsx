import { Image, ListGroup, ListGroupItem } from "react-bootstrap";

function SearchResults({ results }) {

    function SingleResult({ result }) {
        return (
            <ListGroupItem>
                <Image src={result.thumbnail_urls[1]} className="float-start me-2" thumbnail />
                <h2>{result.title}</h2>
                <p>by: {result.authors.map((a, i) => [i > 0 && ", ", <a href="#" key={a.key}>{a.name}</a>])}</p>
                <p>First published in: {result.first_publish_year}</p>
                <p>Median page count: {result.number_of_pages_median}</p>
                <p>{result.subjects.map((s, i) => [i > 0 && ", ", <a href="#" key={s.key}>{s.name}</a>])}</p>
            </ListGroupItem>
        )
    }

    if (!results) {
        return null;
    }

    return (
        <div>
            {results.numFound > 0
                ? <p>Results: {results.numFound}</p>
                : <p>No results</p>}
            <ListGroup>
                {results.results.map(r => <SingleResult key={r.key} result={r} />)}
            </ListGroup>
        </div>
    );
}

export default SearchResults;