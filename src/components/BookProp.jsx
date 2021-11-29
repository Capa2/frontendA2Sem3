import SearchResults from "./search/SearchResults";

function BookProp({result}) {
    
    const {title, author} = result;

    return (
        <div>
            <h1>This book has the title {title}</h1>
            <h2>This book has the author {author}</h2>
        </div>
    );

}

export default BookProp;