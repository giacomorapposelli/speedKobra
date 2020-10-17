import React, { useState, useEffect } from "react";
import Header from "./header";
import Tour from "./tour";
import Home from "./home";
import Gallery from "./gallery";
import Store from "./store";
import Footer from "./footer";

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
        <div id="container">
            <Header
                classStore={classStore}
                classHome={classHome}
                classGallery={classGallery}
                classTour={classTour}
                updateStoreClass={updateStoreClass}
                updateTourClass={updateTourClass}
                updateGalleryClass={updateGalleryClass}
                updateHomeClass={updateHomeClass}
            />
            <Home onMouseOver={updateHomeClass} />
            <Tour onMouseOver={updateTourClass} />
            <Gallery onMouseOver={updateGalleryClass} />
            <Store onMouseOver={updateStoreClass} />
            <Footer />
        </div>
    );
}
