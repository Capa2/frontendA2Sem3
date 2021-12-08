import { useEffect, useState } from "react";
import Star from "./Star";
import apiFacade from "../../apiFacade";

function Rating({ bookId, mounted, isLoggedIn, inLibrary }) {
    const [rating, setRating] = useState();

    useEffect(() => {
        if (inLibrary) {
            setRating(inLibrary.rating);
        }
    }, [inLibrary]);

    useEffect(() => {
        if (inLibrary && rating != undefined) apiFacade.editRating(bookId, rating, mounted);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    if (!isLoggedIn || !inLibrary) return null;

    return (
        <div className="W-100 my-4">
            <Star key="0" index="0" rating={rating} callback={setRating} />
            <Star key="1" index="1" rating={rating} callback={setRating} />
            <Star key="2" index="2" rating={rating} callback={setRating} />
            <Star key="3" index="3" rating={rating} callback={setRating} />
            <Star key="4" index="4" rating={rating} callback={setRating} />
        </div>
    );
}

export default Rating;