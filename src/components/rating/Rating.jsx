import { useEffect, useState } from "react";
import Star from "./Star";

function Rating({ initRating }) {
    var [rating, setRating] = useState(initRating);

    useEffect(() => {
        //TODO: Update rating in backend
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