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
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const updateTourClass = () => {
        setClassHome("head-links");
        setClassTour("head-links greyed");
        setClassGallery("head-links");
        setClassStore("head-links");
        window.scrollTo({ top: 700, behavior: "smooth" });
    };

    const updateGalleryClass = () => {
        setClassHome("head-links");
        setClassTour("head-links");
        setClassGallery("head-links greyed");
        setClassStore("head-links");
        window.scrollTo({ top: 1432, behavior: "smooth" });
    };

    const updateStoreClass = () => {
        setClassHome("head-links");
        setClassTour("head-links");
        setClassGallery("head-links");
        setClassStore("head-links greyed");
        window.scrollTo({ top: 2170, behavior: "smooth" });
    };

    return (
        <div className="container2">
            <header>
                <p>
                    <a className={classHome} onClick={updateHomeClass}>
                        HOME
                    </a>
                </p>
                <p>
                    <a className={classTour} onClick={updateTourClass}>
                        TOUR
                    </a>
                </p>
                <p>
                    <a className={classGallery} onClick={updateGalleryClass}>
                        GALLERY
                    </a>
                </p>
                <p>
                    <a className={classStore} onClick={updateStoreClass}>
                        STORE
                    </a>
                </p>
            </header>
            <div className="container">
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
        </div>
    );
}
