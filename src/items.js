import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Items() {
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [tshirt1, setTshirt1] = useState([]);
    const [tshirt2, setTshirt2] = useState([]);
    const [vinyl, setVinyl] = useState([]);

    const addTshirt1 = (event) => {
        event.preventDefault();
        axios
            .post("/addthsirt1")
            .then((response) => {
                setTshirt1(response.data);
                console.log("TSHIRT 1: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    };

    const addTshirt2 = (event) => {
        event.preventDefault();
        axios
            .post("/addthsirt2")
            .then((response) => {
                setTshirt2(response.data);
                console.log("TSHIRT 2: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    };

    const addVinyl = (event) => {
        event.preventDefault();
        axios
            .post("/addvinyl")
            .then((response) => {
                setVinyl(response.data);
                console.log("VINYL: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    };

    useEffect(() => {
        // console.log(size);
        // console.log(color);
    });

    return (
        <div className="shop-general">
            <div className="row">
                <div className="merch-card">
                    <p className="diocane">tshirt1</p>
                    <form>
                        <label htmlFor="sizes" className="success">
                            Size:
                        </label>
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                        </select>
                        <button onClick={addTshirt1}>Add to cart</button>
                    </form>
                </div>

                <div className="merch-card">
                    <p className="diocane">tshrt2</p>
                    <form>
                        <label htmlFor="sizes" className="success">
                            Size:
                        </label>
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                        </select>
                        <button onClick={addTshirt2}>Add to cart</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="merch-card">
                    <p className="diocane">Vynil</p>
                    <form>
                        <label htmlFor="sizes" className="success">
                            Color:
                        </label>
                        <select
                            name="color"
                            onChange={(event) => setColor(event.target.value)}
                        >
                            <option value="red">RED</option>
                            <option value="yellow">YELLOW</option>
                            <option value="green">GREEN</option>
                            <option value="light-blue">LIGHT BLUE</option>
                        </select>
                        <button onClick={addVinyl}>Add to cart</button>
                    </form>
                </div>

                <div className="merch-card">
                    <p className="diocane">Sold Out</p>
                </div>
            </div>
        </div>
    );
}
