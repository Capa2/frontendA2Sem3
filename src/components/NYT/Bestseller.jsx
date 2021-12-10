import { Image, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Bestseller({book}) {
    
    const{ title, author, description, publisher, primary_isbn13 } = book;

    const navigate = useNavigate();

    function go() {
        navigate(`/?query=${primary_isbn13}&filter=isbn&limit=15`);
        window.scrollTo(0, 0);
    }
    
    return ( 
        <Row>
        <Col sm="12" md="2">
        <Image thumbnail src={book.book_image} onClick={go}/>
        </Col>
        <Col  sm="12" md="10">
        <h3>{title}</h3>
        <p>Author: {author}</p> 
        <p>Publisher: {publisher}</p>
        <p>{description}</p>
        <Button
            variant="secondary"
            onClick={go}
        >Find this book
        </Button>
        </Col>
        </Row>
     );
}

export default Bestseller;