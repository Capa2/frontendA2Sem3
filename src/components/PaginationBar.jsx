import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function PaginationBar({ result }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, Number(searchParams.get("page")));
    const { numFound, limit } = result;
    const lastPage = calcLastPage();

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

    function calcLastPage() {
        return Math.ceil(numFound / limit);
    }

    function goToLastPage() {
        searchParams.set("page", lastPage);
        setSearchParams(searchParams);
    }

    function isFirstPage() {
        return !page || page <= 1;
    }

    function isLastPage() {
        return page >= lastPage;
    }

    return (
        <div>
            <Pagination>
                <Pagination.First disabled={isFirstPage()} onClick={goToFirstPage} />
                <Pagination.Prev disabled={isFirstPage()} onClick={goToPreviousPage} />
                <Pagination.Next disabled={isLastPage()} onClick={goToNextPage} />
                <Pagination.Last disabled={isLastPage()} onClick={goToLastPage} />
            </Pagination>
        </div>
    );
}

export default PaginationBar;