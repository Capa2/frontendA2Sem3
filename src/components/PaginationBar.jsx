import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function PaginationBar({ result }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { limit, offset } = result;

    function goToPreviousPage() {
        let newOffset = Math.max(0, offset - limit);
        searchParams.set("offset", newOffset);
        setSearchParams(searchParams);
    }

    function goToNextPage() {
        let newOffset = offset + limit;
        searchParams.set("offset", newOffset);
        setSearchParams(searchParams);
    }

    return (
        <div>
            <Pagination>
                <Pagination.Prev disabled={offset === 0} onClick={goToPreviousPage} />
                <Pagination.Next onClick={goToNextPage} />
            </Pagination>
        </div>
    );
}

export default PaginationBar;