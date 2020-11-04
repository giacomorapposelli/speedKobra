import React, { useEffect } from "react";

export default function TshirtSlider(props) {
    useEffect(() => {
        const slider = document.querySelector(".images-slide");
        const carouselImages = document.querySelectorAll(".images-slide img");
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
            if (carouselImages[counter].id === "lastCloneTshirt") {
                nextBtn.style.visibility = "hidden";
            }

            if (carouselImages[counter].id === "firstCloneTshirt") {
                prevBtn.style.visibility = "hidden";
            }
        });
    });

    return (
        <div className="tshirt-modal">
            <a id="x-modal" onClick={props.closeModal}>
                X
            </a>
            <img src="/back.png" alt="" className="prev-btn" />
            <img src="/next.png" alt="" className="next-btn" />
            <div className="images-slide">
                <img
                    src="/tshirt-white.jpg"
                    className="tshirtphoto"
                    id="firstCloneTshirt"
                />
                <img
                    src="/tshirt-grey.jpg"
                    className="tshirtphoto"
                    id="lastCloneTshirt"
                />
            </div>
        </div>
    );
}