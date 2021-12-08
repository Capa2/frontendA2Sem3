import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FormSelect, FormGroup, FormLabel, Row, Col } from "react-bootstrap";


function ResultLimiter({ query, filter, limit, setLimit }) {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (query) setSearchParams(
            {
                "query": query,
                "filter": filter,
                "limit": limit
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);

    return (
        <FormGroup controlId="limit">
            <Row>
                <Col xs="8" clasName="text-end">
                    <FormLabel className="d-block my-1 text-end fw-bold">Results per page</FormLabel>
                </Col>
                <Col xs="4">
                    <FormSelect
                        name="limit"
                        value={limit}
                        // default value is set at the top where limit is initialised.
                        // defaultValue didn't work because of value overwriting it, the url params being set based on limit state, and limit is only updated onChange
                        aria-label="result limit per page"
                        onChange={e => setLimit(e.target.value)}
                    >
                        <option value={5}>5</option>
                        <option value={15}>15</option>
                        <option value={25}>25</option>
                    </FormSelect>
                </Col>
            </Row>
        </FormGroup>
    );
}

export default ResultLimiter;