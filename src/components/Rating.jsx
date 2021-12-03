import { useEffect, useState } from "react";
import star from '../img/star/star.png';
function Rating({ initRating }) {
    const [rating, setRating] = useState(3);
    const stars = () => {
        let array = Array.of(5);
        array.forEach((item, index) => {
            item = (index <= rating) ? true : false;
        });
        return array;
    }

    function ratingClick() {
        console.log('Click!!!!');
    }

    function getStars() {
        return stars.map((star) => { <img src="../img/star/star.png" className="m-2" height="auto" width="25px" alt="star" onClick={ratingClick} /> });
    }

    try { return getStars() }
    catch { return <p>* * * * *</p> }

    return (
        <p>* * * * *</p>
    )
}

export default Rating;