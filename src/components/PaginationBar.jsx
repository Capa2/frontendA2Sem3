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
        searchParams.set("page", Math.min(page - 1, lastPage));
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

    function goToPage(event) {
        const number = event.target.innerHTML;
        console.log(event.target.active)
        if (!event.target.active) {
            searchParams.set("page", event.target.innerHTML);
            setSearchParams(searchParams);
        }
    }

    function SinglePageBtn({ number }) {
        return (
            <>
                {number != page && number >= 1 && number <= lastPage &&
                    <Pagination.Item onClick={goToPage}>{number}</Pagination.Item>
                }
                {number == page &&
                    <Pagination.Item active>{number}</Pagination.Item>
                }
            </>
        )
    }

    function NumberedPages() {
        return (
            <>
                <SinglePageBtn number={page - 2} />
                <SinglePageBtn number={page - 1} />
                <SinglePageBtn number={page} />
                <SinglePageBtn number={page + 1} />
                <SinglePageBtn number={page + 2} />
            </>
        );
    }

    return (
        <div>
            <Pagination>
                <Pagination.First disabled={isFirstPage()} onClick={goToFirstPage} />
                <Pagination.Prev disabled={isFirstPage()} onClick={goToPreviousPage} />
                <NumberedPages />
                <Pagination.Next disabled={isLastPage()} onClick={goToNextPage} />
                <Pagination.Last disabled={isLastPage()} onClick={goToLastPage} />
            </Pagination>
        </div>
    );
}

export default PaginationBar;