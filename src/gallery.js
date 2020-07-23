import React from "react";

export default function Gallery() {
    return (
        <div className="gallery" id="gallery">
            <h1 className="headlines">IMAGE GALLERY</h1>
            <div className="card-container">
                <div className="card">
                    <img src="/live.jpg" alt="" className="img-view" />
                    <h3 className="card-desc">LIVE SHOTS</h3>
                </div>
                <div className="card">
                    <img src="/leipzig.png" alt="" className="img-view" />
                    <h3 className="card-desc">ON THE ROAD</h3>
                </div>
                <div className="card">
                    <img src="/kopi.png" alt="" className="img-view" />
                    <h3 className="card-desc">SHOW FLYERS</h3>
                </div>
            </div>
        </div>
    );
}
