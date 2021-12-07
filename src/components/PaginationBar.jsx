import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function PaginationBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page"));

    function goToFirstPage() {
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    }

    function goToPreviousPage() {
        searchParams.set("page", page - 1);
        setSearchParams(searchParams);
    }

    function goToNextPage() {
        searchParams.set("page", page + 1);
        setSearchParams(searchParams);
    }

    function isFirstPage() {
        return !page || page <= 1;
    }

    return (
        <div>
            <Pagination>
                <Pagination.First disabled={isFirstPage()} onClick={goToFirstPage} />
                <Pagination.Prev disabled={isFirstPage()} onClick={goToPreviousPage} />
                <Pagination.Next onClick={goToNextPage} />
            </Pagination>
        </div>
    );
}

export default PaginationBar;