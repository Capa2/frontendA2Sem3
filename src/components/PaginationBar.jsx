import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function PaginationBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page"));

    function goToPreviousPage() {
        searchParams.set("page", page - 1);
        setSearchParams(searchParams);
    }

    function goToNextPage() {
        searchParams.set("page", page + 1);
        setSearchParams(searchParams);
    }

    return (
        <div>
            <Pagination>
                <Pagination.Prev disabled={!page || page <= 1} onClick={goToPreviousPage} />
                <Pagination.Next onClick={goToNextPage} />
            </Pagination>
        </div>
    );
}

export default PaginationBar;