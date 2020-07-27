import React, { useState, useEffect } from "react";

export default function VinylSlider(props) {
    useEffect(() => {
        const slider = document.querySelector(".images-slide");
        const carouselImages = document.querySelectorAll(".images-slide img");
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
            if (carouselImages[counter].id === "lastCloneVinyl") {
                slider.style.transition = "none";
                counter = carouselImages.length - 2;
                slider.style.transform =
                    "translateX(" + -size * counter + "px)";
            }
            if (carouselImages[counter].id === "firstCloneVinyl") {
                slider.style.transition = "none";
                counter = carouselImages.length - counter;
                slider.style.transform =
                    "translateX(" + -size * counter + "px)";
            }
        });
    });

    return (
        <div className="vinyl-modal">
            <img src="/icons/back.png" alt="" className="prev-btn" />
            <img src="/icons/next.png" alt="" className="next-btn" />
            <div className="images-slide">
                <img
                    src="/vinyl-light.jpg"
                    id="lastCloneVinyl"
                    className="vinylphoto"
                />
                <img src="/vinyl-red.jpg" className="vinylphoto" />
                <img src="/vinyl-green.jpg" className="vinylphoto" />
                <img src="/vinyl-blue.jpg" className="vinylphoto" />
                <img src="/vinyl-light.jpg" className="vinylphoto" />
                <img
                    src="/vinyl-red.jpg"
                    id="firstCloneVinyl"
                    className="vinylphoto"
                />
            </div>
        </div>
    );
}
