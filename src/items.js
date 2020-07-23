import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Items() {
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [tshirt1, setTshirt1] = useState([]);
    const [tshirt2, setTshirt2] = useState([]);
    const [vinyl, setVinyl] = useState([]);
    const [order, setOrder] = useState([]);
    let total;

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

    const submitOrder = (event) => {
        event.preventDefault();
        axios
            .get("/order")
            .then((response) => {
                setOrder(response.data);
            })
            .catch((err) => {
                console.log("ERROR IN ORDER: ", err);
            });
    };
    useEffect(() => {
        console.log(size);
        console.log(color);
        console.log("ORDER: ", order);
    });
    return (
        <div className="shop-general">
            <div className="row">
                <div className="merch-card">
                    <p className="diocane">tshirt1</p>
                    <form>
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="-">Size</option>
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
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="-">Size</option>
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
                        <select
                            name="color"
                            onChange={(event) => setColor(event.target.value)}
                        >
                            <option value="-">Color</option>
                            <option value="Clear Red">CLEAR RED</option>
                            <option value="Clear Green">CLEAR GREEN</option>
                            <option value="Blue">BLUE</option>
                            <option value="Light Blue">LIGHT BLUE</option>
                        </select>
                        <button onClick={addVinyl}>Add to cart</button>
                    </form>
                </div>

                <div className="merch-card">
                    <p className="diocane">Sold Out</p>
                </div>
            </div>
            <div className="cart">
                {(!tshirt1.length && !tshirt2.length && !vinyl.length && (
                    <h1 className="success">Your Cart is empty</h1>
                )) ||
                    (tshirt1.length > 0 && (
                        <div>
                            <p className="success">{tshirt1[0].tshirt}</p>
                            <p className="success">Size: {tshirt1[0].size}</p>
                            <p className="success">
                                Price: {tshirt1[0].price}€
                            </p>
                            <button onClick={removeTshirt1}>Remove Item</button>
                        </div>
                    ))}
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

                <button onClick={submitOrder}>Submit Order</button>
            </div>

            {order.length > 0 && (
                <div>
                    <h1 className="success">THANK YOU</h1>
                    <h3 className="success">
                        We've just received your order,you'll be contacted soon
                        about shipment and payment methods
                    </h3>
                    <h2 className="success">Your Order:</h2>
                    <div>
                        {order.map((each) => {
                            <div
                                key={each.order_id}
                                className="resume-container"
                            >
                                <h3 className="success">{each}</h3>
                            </div>;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
