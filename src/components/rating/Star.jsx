import { useEffect, useState } from "react";
import starImg from '../../img/star/starImg.png';
import nostarImg from '../../img/star/nostarImg.png';
import { Image } from "react-bootstrap";

function Star({ index, rating, callback }) {

    const onOff = index < rating;

    function click() {
        callback(index*1 + 1);
    }

    return (
        <Image src={onOff ? starImg : nostarImg} className="m-2" height="auto" width="25px" alt="star" onClick={click} />
    );
}

export default Star;
