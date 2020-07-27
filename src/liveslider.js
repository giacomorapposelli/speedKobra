import React, { useEffect } from "react";

export default function LiveSlider() {
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
            if (carouselImages[counter].id === "lastCloneLive") {
                slider.style.transition = "none";
                counter = carouselImages.length - 2;
                slider.style.transform =
                    "translateX(" + -size * counter + "px)";
            }
            if (carouselImages[counter].id === "firstCloneLive") {
                slider.style.transition = "none";
                counter = carouselImages.length - counter;
                slider.style.transform =
                    "translateX(" + -size * counter + "px)";
            }
        });
    });

    return (
        <div className="live-modal">
            <img src="/icons/back.png" alt="" className="prev-btn" />
            <img src="/icons/next.png" alt="" className="next-btn" />
            <div className="images-slide">
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-6360740bICCYSP.jpg"
                    id="lastCloneLive"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gKRtrwC6.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074fdQFO2Mt.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074GaiMI0Yh.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074xeqZTFdB.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074g46R0Fqp.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074pBBAPtXq.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074vwYjpoBv.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-6360740bICCYSP.jpg"
                    className="livephoto"
                />
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gKRtrwC6.jpg"
                    id="firstCloneLive"
                    className="livephoto"
                />
            </div>
        </div>
    );
}
