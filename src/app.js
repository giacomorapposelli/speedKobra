import React, { useState } from "react";
import Tour from "./tour";
import Home from "./home";
import Gallery from "./gallery";
import Store from "./store";

export default function App() {
    const [classHome, setClassHome] = useState("head-links greyed");
    const [classTour, setClassTour] = useState("head-links");
    const [classGallery, setClassGallery] = useState("head-links");
    const [classStore, setClassStore] = useState("head-links");

    const updateHomeClass = () => {
        setClassHome("head-links greyed");
        setClassTour("head-links");
        setClassGallery("head-links");
        setClassStore("head-links");
    };

    const updateTourClass = () => {
        setClassHome("head-links");
        setClassTour("head-links greyed");
        setClassGallery("head-links");
        setClassStore("head-links");
    };

    const updateGalleryClass = () => {
        setClassHome("head-links");
        setClassTour("head-links");
        setClassGallery("head-links greyed");
        setClassStore("head-links");
    };

    const updateStoreClass = () => {
        setClassHome("head-links");
        setClassTour("head-links");
        setClassGallery("head-links");
        setClassStore("head-links greyed");
    };

    return (
        <div className="container">
            <header>
                <p>
                    <a
                        href="#home"
                        className={classHome}
                        onClick={updateHomeClass}
                    >
                        HOME
                    </a>
                </p>
                <p>
                    <a
                        href="#tour"
                        className={classTour}
                        onClick={updateTourClass}
                    >
                        TOUR
                    </a>
                </p>
                <p>
                    <a
                        href="#gallery"
                        className={classGallery}
                        onClick={updateGalleryClass}
                    >
                        GALLERY
                    </a>
                </p>
                <p>
                    <a
                        href="#store"
                        className={classStore}
                        onClick={updateStoreClass}
                    >
                        STORE
                    </a>
                </p>
            </header>
            <Home />
            <Tour />
            <Gallery />
            <Store />
            <footer>
                <p className="copyright">
                    © 2020 Speedköbra - All rights reserved
                </p>
                <div className="logos">
                    <a href="https://www.instagram.com/speedkobra/">
                        <img
                            src="/insta.png"
                            alt=""
                            className="social-logo"
                            target="_blank"
                        />
                    </a>
                    <a href="https://www.facebook.com/speedkobra666">
                        <img
                            src="/fb.png"
                            alt=""
                            className="social-logo"
                            target="_blank"
                        />
                    </a>
                    <a href="https://www.youtube.com/channel/UC57goUK4nTrwOGdhchCw8TA">
                        <img
                            src="/you.png"
                            alt=""
                            className="social-logo"
                            target="_blank"
                        />
                    </a>
                    <a href="https://open.spotify.com/artist/6bwLhL6tsar6mpLQTvnxr9">
                        <img
                            src="/spotify.png"
                            target="_blank"
                            className="social-logo bc"
                        />
                    </a>
                </div>
            </footer>
        </div>
    );
}
