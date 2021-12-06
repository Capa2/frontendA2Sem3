import { useEffect, useState } from "react";
import Star from "./Star";
import apiFacade from "../../apiFacade";

function Rating({ bookId, initRating, status }) {
    var [rating, setRating] = useState(initRating);

    useEffect(() => {
        apiFacade.editLibrary(bookId, rating, status, true);
    }, [rating]);

    return (
        <div className="W-100 my-3">
            <Star key="0" index="0" rating={rating} callback={setRating} />
            <Star key="1" index="1" rating={rating} callback={setRating} />
            <Star key="2" index="2" rating={rating} callback={setRating} />
            <Star key="3" index="3" rating={rating} callback={setRating} />
            <Star key="4" index="4" rating={rating} callback={setRating} />
        </div>
    );
}

export default Rating;