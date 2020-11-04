import React, { useEffect, useState } from "react";

export default function OnTheRoadSlider(props) {
    useEffect(() => {
        const slider = document.querySelector(".otr-slide");
        const carouselImages = document.querySelectorAll(".otr-slide img");
        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");
        let counter = 0;
        const size = carouselImages[0].clientWidth;
        prevBtn.style.visibility = "hidden";
        slider.style.transform = "translateX(" + -size * counter + "px)";

        nextBtn.addEventListener("click", () => {
            prevBtn.style.visibility = "visible";
            if (counter == carouselImages.length - 1) {
                return;
            }
            slider.style.transition = "transform 0.5s ease-in-out";
            counter++;
            slider.style.transform = "translateX(" + -size * counter + "px)";
        });

        prevBtn.addEventListener("click", () => {
            nextBtn.style.visibility = "visible";
            if (counter <= 0) {
                return;
            }
            slider.style.transition = "transform 0.5s ease-in-out";
            counter--;
            slider.style.transform = "translateX(" + -size * counter + "px)";
        });

        slider.addEventListener("transitionend", () => {
            if (carouselImages[counter].id === "lastClone") {
                nextBtn.style.visibility = "hidden";
            }

            if (carouselImages[counter].id === "firstClone") {
                prevBtn.style.visibility = "hidden";
            }
        });
    });

    return (
        <div className="otr-modal">
            <a id="x-gallery-modal" onClick={props.closeModal}>
                X
            </a>
            <img src="/back.png" alt="" className="prev-btn" />
            <img src="/next.png" alt="" className="next-btn" />
            <div className="otr-slide">
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gz0yfIV0.jpg"
                    className="otrphoto"
                    id="firstClone"
                />
                <img src="castle.jpg" className="otrphoto" />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074T3UrqRS2.jpg"
                    className="otrphoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074NDB2EYHF.jpg"
                    className="otrphoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074JSc9hig0.jpg"
                    className="otrphoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074nKirjYZq.jpg"
                    className="otrphoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074zQc31wfr.jpg"
                    className="otrphoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074YWSgCi1L.jpg"
                    className="otrphoto"
                    id="lastClone"
                />
            </div>
        </div>
    );
}
