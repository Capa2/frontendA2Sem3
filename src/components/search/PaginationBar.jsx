import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

function PaginationBar({ searchResult }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, Number(searchParams.get("page")));
    const numFound = searchResult ? searchResult.numFound : 0;
    const limit = searchResult ? searchResult.limit : 0;
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
        searchParams.set("page", number);
        setSearchParams(searchParams);
    }

    function SinglePageBtn({ number, disabled }) {
        return (
            <>
                {number !== page && number >= 1 && number <= lastPage &&
                    <Pagination.Item disabled={disabled} onClick={goToPage}>{number}</Pagination.Item>
                }
                {number === page &&
                    <Pagination.Item active>{number}</Pagination.Item>
                }
            </>
        )
    }

    function NumberedPages() {
        return (
            <>
                <SinglePageBtn disabled={!searchResult} number={page - 2} />
                <SinglePageBtn disabled={!searchResult} number={page - 1} />
                <SinglePageBtn disabled={!searchResult} number={page} />
                <SinglePageBtn disabled={!searchResult} number={page + 1} />
                <SinglePageBtn disabled={!searchResult} number={page + 2} />
            </>
        );
    }

    return (
        <div>
            <Pagination>
                <Pagination.First disabled={!searchResult || isFirstPage()} onClick={goToFirstPage} />
                <Pagination.Prev disabled={!searchResult || isFirstPage()} onClick={goToPreviousPage} />
                <NumberedPages />
                <Pagination.Next disabled={!searchResult || isLastPage()} onClick={goToNextPage} />
                <Pagination.Last disabled={!searchResult || isLastPage()} onClick={goToLastPage} />
            </Pagination>
        </div>
    );
}

export default PaginationBar;