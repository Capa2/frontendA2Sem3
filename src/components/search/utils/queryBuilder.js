function buildPaginationStringFromParams(searchParams) {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const newOffset = Math.max(0, (page - 1) * limit);
    return new URLSearchParams({
        limit,
        "offset": newOffset
    }).toString();
}

function buildQueryFromParams(searchParams) {
    const query = searchParams.get("query");
    let filter = searchParams.get("filter");
    filter = !(filter === "none" || filter === "null" || !filter) ? filter + ":" : "";
    const paginationString = buildPaginationStringFromParams(searchParams);
    return filter + query + "?" + paginationString;
}

export default buildQueryFromParams;