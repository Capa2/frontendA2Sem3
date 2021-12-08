import { useSearchParams } from "react-router-dom";

export default function ResultStatus({ searchResult }) {
    const [searchParams] = useSearchParams();
    var status = "I am the status overwrite me";

    try {
        if (searchResult.numFound === 0) {
            status = "No results"
        } else if (searchResult.numFound > 0) {
            status = searchResult.numFound + " results";
        }
    } catch {
        status = searchParams.has("query") ? "loading..." : "";
    }

    return (
        <strong>{status}</strong>
    );

}