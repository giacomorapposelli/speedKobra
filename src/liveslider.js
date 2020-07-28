import React, { useEffect } from "react";

export default function LiveSlider() {
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
            if (carouselImages[counter].id === "lastCloneLive") {
                nextBtn.style.visibility = "hidden";
            }

            if (carouselImages[counter].id === "firstCloneLive") {
                prevBtn.style.visibility = "hidden";
            }
        });
    });

    return (
        <div className="live-modal">
            <img src="/back.png" alt="" className="prev-btn" />
            <img src="/next.png" alt="" className="next-btn" />
            <div className="images-slide">
                <img
                    src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gKRtrwC6.jpg"
                    className="livephoto"
                    id="firstCloneLive"
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
                    id="lastCloneLive"
                />
            </div>
        </div>
    );
}
