import { useSearchParams } from "react-router-dom";

export default function ResultStatus({ result }) {
    const [searchParams] = useSearchParams();
    var status = "I am the status overwrite me";

    try {
        if (result.numFound === 0) {
            status = "No results"
        } else if (result.numFound > 0) {
            status = result.numFound + " results";
        }
    } catch {
        status = searchParams.has("query") ? "loading..." : "";
    }

    return (
        <p>{status}</p>
    );

}