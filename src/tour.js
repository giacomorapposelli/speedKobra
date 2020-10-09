import React from "react";

export default function Tour(props) {
    return (
        <div className="tour" id="tour" onMouseOver={props.onMouseOver}>
            <h1 className="tour-headline">UPCOMING TOURDATES</h1>
            <div className="show-container">
                <p className="column-title">DATE</p>
                <p className="column-title">LOCATION</p>
                <p className="column-title">CITY</p>
                <p className="column-title">FB EVENT</p>
            </div>
            <div className="show-container">
                <p className="column">21.11.2020</p>
                <p className="column">KULTURHAUS KILI</p>
                <p className="column">BERLIN,DE</p>
                <p className="column">SEE EVENT</p>
            </div>
            <div className="show-container">
                <p className="column">16.11.2019</p>
                <p className="column">LOBUSCH NO PASARAN</p>
                <p className="column">HAMBURG,DE</p>
                <a className="column">SEE EVENT</a>
            </div>
            <div className="show-container">
                <p className="column">02.11.2019</p>
                <p className="column">PALETTENFEST</p>
                <p className="column">GÖTTINGEN,DE</p>
                <a
                    className="column"
                    href="https://www.facebook.com/events/1406567729499207/"
                >
                    SEE EVENT
                </a>
            </div>
            <div className="show-container">
                <p className="column">01.11.2019</p>
                <p className="column">VRANKREICH</p>
                <p className="column">AMSTERDAM,NL</p>
                <p className="column">SEE EVENT</p>
            </div>
            <div className="show-container">
                <p className="column">31.10.2019</p>
                <p className="column">THE PITS</p>
                <p className="column">KORTRIJK,BE</p>
                <p className="column">SEE EVENT</p>
            </div>
            <div className="show-container">
                <p className="column">30.10.2019</p>
                <p className="column">LA ZONE</p>
                <p className="column">LIEGE,BE</p>
                <p className="column">SEE EVENT</p>
            </div>
        </div>
    );
}
