import React from "react";

export default function App(props) {
    return (
        <div className="home" id="home" onMouseOver={props.onMouseOver}>
            <div className="message">
                <h1 className="our">Our New Album</h1>
                <h1 className="days">DAYS OF MADNESS</h1>
                <h1 className="our">Is Out Now!</h1>
                <a
                    href="https://open.spotify.com/artist/6bwLhL6tsar6mpLQTvnxr9"
                    className="listen"
                    target="_blank"
                >
                    Listen Here
                </a>
            </div>
            <img src="/days.jpg" alt="" className="album" />
        </div>
    );
}
