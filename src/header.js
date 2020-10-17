import React from "react";

export default function Header(props) {
    const scrollToSection = (index) => {
        const sections = document.getElementsByClassName("section");
        sections[index].scrollIntoView();
    };
    return (
        <header>
            <nav>
                <ul>
                    <li
                        className={props.classHome}
                        onClick={() => {
                            props.updateHomeClass();
                            scrollToSection(0);
                        }}
                    >
                        HOME
                    </li>
                    <li
                        className={props.classTour}
                        onClick={() => {
                            props.updateTourClass();
                            scrollToSection(1);
                        }}
                    >
                        TOUR
                    </li>
                    <li
                        className={props.classGallery}
                        onClick={() => {
                            props.updateGalleryClass();
                            scrollToSection(2);
                        }}
                    >
                        GALLERY
                    </li>
                    <li
                        className={props.classStore}
                        onClick={() => {
                            props.updateStoreClass();
                            scrollToSection(3);
                        }}
                    >
                        STORE
                    </li>
                </ul>
            </nav>
        </header>
    );
}
