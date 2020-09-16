import React, { useState } from "react";
import LiveSlider from "./liveslider";
import OnTheRoadSlider from "./ontheroadslider";

export default function Gallery(props) {
    const [liveSlider, setLiveSlider] = useState(false);
    const [ontTheRoadSlider, setOnTheRoadSlider] = useState(false);
    const [className, setClassName] = useState();

    const setLiveModal = (event) => {
        event.preventDefault();
        setLiveSlider(true);
        setClassName("overlay");
    };

    const setOnTheRoadModal = (event) => {
        event.preventDefault();
        setOnTheRoadSlider(true);
        setClassName("overlay");
    };

    const closeLiveModal = (event) => {
        event.preventDefault();
        setLiveSlider(false);
        setOnTheRoadSlider(false);
        setClassName("");
        document.body.style.overflowY = "";
    };

    return (
        <div className="gallery" id="gallery" onMouseOver={props.onMouseOver}>
            <div
                className={className}
                onClick={closeLiveModal}
                id="galleria"
            ></div>
            <h1 className="headlines">IMAGE GALLERY</h1>
            <div className="card-container">
                <div className="card">
                    <img
                        src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gKRtrwC6.jpg"
                        alt=""
                        className="img-view"
                        onClick={setLiveModal}
                    />
                    <h3 className="card-desc" onClick={setLiveModal}>
                        LIVE SHOTS
                    </h3>
                </div>
                <div className="card">
                    <img
                        src="https://dvqlxo2m2q99q.cloudfront.net/000_clients/636074/page/h800-636074gz0yfIV0.jpg"
                        alt=""
                        className="img-view"
                        onClick={setOnTheRoadModal}
                    />
                    <h3 className="card-desc" onClick={setOnTheRoadModal}>
                        ON THE ROAD
                    </h3>
                </div>
            </div>
            {liveSlider && <LiveSlider />}
            {ontTheRoadSlider && <OnTheRoadSlider />}{" "}
        </div>
    );
}
