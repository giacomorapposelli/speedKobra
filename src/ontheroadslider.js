import React, { useEffect, useState } from "react";

export default function OnTheRoadSlider() {
    useEffect(() => {
        const slider = document.querySelector(".otr-slide");
        const carouselImages = document.querySelectorAll(".otr-slide img");
        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");

        let counter = 1;
        const size = carouselImages[0].clientWidth;

        slider.style.transform = "translateX(" + -size * counter + "px)";

        nextBtn.addEventListener("click", () => {
            console.log(carouselImages);
            if (counter == carouselImages.length - 1) {
                return;
            }
            slider.style.transition = "transform 0.5s ease-in-out";
            counter++;
            slider.style.transform = "translateX(" + -size * counter + "px)";
        });

        prevBtn.addEventListener("click", () => {
            console.log(carouselImages);
            if (counter <= 0) {
                return;
            }
            slider.style.transition = "transform 0.5s ease-in-out";
            counter--;
            slider.style.transform = "translateX(" + -size * counter + "px)";
        });

        slider.addEventListener("transitionend", () => {
            if (carouselImages[counter].id === "lastClone") {
                slider.style.transition = "none";
                counter = carouselImages.length - 2;
                slider.style.transform =
                    "translateX(" + -size * counter + "px)";
            }
            if (carouselImages[counter].id === "firstClone") {
                slider.style.transition = "none";
                counter = carouselImages.length - counter;
                slider.style.transform =
                    "translateX(" + -size * counter + "px)";
            }
        });
    });

    return (
        <div className="otr-modal">
            <img src="/icons/back.png" alt="" className="prev-btn" />
            <img src="/icons/next.png" alt="" className="next-btn" />
            <div className="otr-slide">
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074YWSgCi1L.jpg"
                    className="otrphoto"
                    id="lastClone"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gz0yfIV0.jpg"
                    className="otrphoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074WjVaXV6s.jpg"
                    className="otrphoto"
                />
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
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gz0yfIV0.jpg"
                    className="otrphoto"
                    id="firstClone"
                />
            </div>
        </div>
    );
}
