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
            .post("/addthsirt1", { size })
            .then((response) => {
                setTshirt1(response.data);
                console.log("TSHIRT 1: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    };

    const addTshirt2 = (event) => {
        event.preventDefault();
        axios
            .post("/addthsirt2", { size })
            .then((response) => {
                setTshirt2(response.data);
                console.log("TSHIRT 2: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    };

    const addVinyl = (event) => {
        event.preventDefault();
        axios
            .post("/addvinyl", { color })
            .then((response) => {
                setVinyl(response.data);
                console.log("VINYL: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    };

    const removeTshirt1 = (event) => {
        event.preventDefault();
        axios
            .post("/removetshirt1")
            .then(() => setTshirt1([]))
            .catch((err) => console.log("TSHIRT NOT REMOVED"));
    };

    const removeTshirt2 = (event) => {
        event.preventDefault();
        axios
            .post("/removetshirt2")
            .then(() => setTshirt2([]))
            .catch((err) => console.log("TSHIRT NOT REMOVED"));
    };

    const removeVinyl = (event) => {
        event.preventDefault();
        axios
            .post("/removevinyl")
            .then(() => setVinyl([]))
            .catch((err) => console.log("VINYL NOT REMOVED"));
    };

    useEffect(() => {
        console.log(size);
        console.log(color);
    });

    return (
        <div className="shop-general">
            <div className="row">
                <div className="merch-card">
                    <p className="diocane">tshirt1</p>
                    <form>
                        <label htmlFor="size" className="success">
                            Size:
                        </label>
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <button onClick={addTshirt1}>Add to cart</button>
                    </form>
                </div>

                <div className="merch-card">
                    <p className="diocane">tshrt2</p>
                    <form>
                        <label htmlFor="size" className="success">
                            Size:
                        </label>
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
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
                            <option value="Clear Red">Clear Red</option>
                            <option value="Clear Green">Clear Green</option>
                            <option value="Blue">Blue</option>
                            <option value="Light Blue">Light Blue</option>
                        </select>
                        <button onClick={addVinyl}>Add to cart</button>
                    </form>
                </div>

                <div className="merch-card">
                    <p className="diocane">Sold Out</p>
                </div>
            </div>
            {(tshirt1 && tshirt1.length > 0) ||
                (tshirt2 && tshirt2.length > 0) ||
                (vinyl && vinyl.length > 0) || <button>Submit Order</button>}
            {tshirt1.length > 0 && (
                <div>
                    <p className="success">{tshirt1[0].tshirt}</p>
                    <p className="success">Size: {tshirt1[0].size}</p>
                    <p className="success">Price: {tshirt1[0].price}€</p>
                    <button onClick={removeTshirt1}>Remove Item</button>
                </div>
            )}
            {tshirt2.length > 0 && (
                <div>
                    <p className="success">{tshirt2[0].tshirt}</p>
                    <p className="success">Size: {tshirt2[0].size}</p>
                    <p className="success">Price: {tshirt2[0].price}€</p>
                    <button onClick={removeTshirt2}>Remove Item</button>
                </div>
            )}
            {vinyl.length > 0 && (
                <div>
                    <p className="success">{vinyl[0].vinyl}</p>
                    <p className="success">Color: {vinyl[0].color}</p>
                    <p className="success">Price: {vinyl[0].price}€</p>
                    <button onClick={removeVinyl}>Remove Item</button>
                </div>
            )}
        </div>
    );
}
