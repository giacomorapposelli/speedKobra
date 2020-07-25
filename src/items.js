import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Items() {
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [tshirt, setTshirt] = useState([]);
    const [longsleeve, setLongsleeve] = useState([]);
    const [vinyl, setVinyl] = useState([]);
    const [order, setOrder] = useState([]);
    const [modal, setModal] = useState("hidden");
    const [total, setTotal] = useState();
    const [className, setClassName] = useState();
    const [soldOut, setSoldOut] = useState("");
    let sum = 0;

    const addTshirt = (event) => {
        event.preventDefault();
        axios
            .post("/addthsirt", { size })
            .then((response) => {
                setTshirt(response.data);
            })
            .catch((err) => console.log("TSHIRT NOT ADDED: ", err));
    };

    const addLongsleeve = (event) => {
        event.preventDefault();
        axios
            .post("/addlongsleeve", { size })
            .then((response) => {
                setLongsleeve(response.data);
            })
            .catch((err) => console.log("TSHIRT NOT ADDED: ", err));
    };

    const addVinyl = (event) => {
        event.preventDefault();
        axios
            .post("/addvinyl", { color })
            .then((response) => {
                setVinyl(response.data);
            })
            .catch((err) => console.log("VINYL NOT ADDED: ", err));
    };

    const removeTshirt = (event) => {
        event.preventDefault();
        axios
            .post("/removetshirt")
            .then(() => setTshirt([]))
            .catch((err) => console.log("TSHIRT NOT REMOVED: ", err));
    };

    const removeLongsleeve = (event) => {
        event.preventDefault();
        axios
            .post("/removelongsleeve")
            .then(() => setLongsleeve([]))
            .catch((err) => console.log("TSHIRT NOT REMOVED: ", err));
    };

    const removeVinyl = (event) => {
        event.preventDefault();
        axios
            .post("/removevinyl")
            .then(() => setVinyl([]))
            .catch((err) => console.log("VINYL NOT REMOVED: ", err));
    };

    const submitOrder = (event) => {
        event.preventDefault();
        axios
            .get("/order")
            .then((response) => {
                setOrder(response.data);
                setModal("visible");
                setClassName("overlay");
                setTshirt([]);
                setLongsleeve([]);
                setVinyl([]);
                document.body.style.overflowY = "hidden";
            })
            .catch((err) => {
                console.log("ERROR IN ORDER: ", err);
            });
    };

    const closeModal = (event) => {
        event.preventDefault();
        setModal("hidden");
        setClassName("");
        document.body.style.overflowY = "";
    };

    const soldOutError = (event) => {
        event.preventDefault();
        setSoldOut("This item is sold out");
        setTimeout(function () {
            setSoldOut("");
        }, 3000);
    };

    useEffect(() => {
        order.map((each) => {
            sum += each.price;
        });
        setTotal(sum);
    }, [order]);
    return (
        <div className="shop-general">
            <div className={className} onClick={closeModal}></div>
            <div className="row">
                <div className="merch-card">
                    <img src="tshirt.jpg" className="item-img" />

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
                        <button onClick={addTshirt}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">"Harvester Of Hate"</p>
                    <p className="item-name">T-Shirt</p>
                    <p className="item-name">Price 10€</p>
                </div>

                <div className="merch-card">
                    <img src="longsleeve.jpg" className="item-img" />
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
                        <button onClick={addLongsleeve}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">"Dehumanized"</p>
                    <p className="item-name">Longsleeve</p>
                    <p className="item-name">Price 15€</p>
                </div>
            </div>
            <div className="row">
                <div className="merch-card">
                    <img src="vinyl-red.jpg" className="item-img" />
                    <form>
                        <select
                            name="color"
                            onChange={(event) => setColor(event.target.value)}
                        >
                            <option value="-">Color</option>
                            <option value="Clear Red">RED</option>
                            <option value="Clear Green">GREEN</option>
                            <option value="Blue">BLUE</option>
                            <option value="Light Blue">LIGHT BLUE</option>
                        </select>
                        <button onClick={addVinyl}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">Days Of Madness</p>
                    <p className="item-name">LP 12"</p>
                    <p className="item-name">Price 12€</p>
                </div>

                <div className="merch-card">
                    <img src="tape.jpg" className="item-img" />
                    <form>
                        <select>
                            <option value="-">--</option>
                        </select>
                        <button onClick={soldOutError}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">Split w/ Moratory</p>
                    <p className="item-name">Tape</p>
                    <p className="sold-out">Sold Out</p>
                    {soldOut && <p className="error">{soldOut}</p>}
                </div>
            </div>
            <div className="cart">
                {!tshirt.length && !longsleeve.length && !vinyl.length && (
                    <h2 className="success">Your Cart is empty</h2>
                )}
                ||
                {tshirt && tshirt.length > 0 && (
                    <div className="item-container">
                        <img src="tshirt.jpg" className="small-pic" />
                        <p className="success">{tshirt[0].tshirt}</p>
                        <p className="success">Size: {tshirt[0].size}</p>
                        <p className="success">Price: {tshirt[0].price}€</p>
                        <img
                            src="/delete.png"
                            className="social-logo"
                            onClick={removeTshirt}
                        />
                    </div>
                )}
                ||
                {longsleeve && longsleeve.length > 0 && (
                    <div className="item-container">
                        <img src="longsleeve.jpg" className="small-pic" />
                        <p className="success">{longsleeve[0].tshirt}</p>
                        <p className="success">Size: {longsleeve[0].size}</p>
                        <p className="success">Price: {longsleeve[0].price}€</p>
                        <img
                            src="/delete.png"
                            className="social-logo"
                            onClick={removeLongsleeve}
                        />
                    </div>
                )}
                ||
                {vinyl && vinyl.length > 0 && (
                    <div className="item-container">
                        <img src="vinyl-red.jpg" className="small-pic" />
                        <p className="success">{vinyl[0].vinyl}</p>
                        <p className="success">Color: {vinyl[0].color}</p>
                        <p className="success">Price: {vinyl[0].price}€</p>
                        <img
                            src="/delete.png"
                            className="social-logo"
                            onClick={removeVinyl}
                        />
                    </div>
                )}
                {tshirt.length > 0 && !longsleeve.length && !vinyl.length && (
                    <p className="success">Total: {tshirt[0].price}€</p>
                )}
                {!tshirt.length && longsleeve.length > 0 && !vinyl.length && (
                    <p className="success">Total: {longsleeve[0].price}€</p>
                )}
                {!tshirt.length && !longsleeve.length && vinyl.length > 0 && (
                    <p className="success">Total: {vinyl[0].price}€</p>
                )}
                {tshirt.length > 0 &&
                    longsleeve.length > 0 &&
                    !vinyl.length && (
                        <p className="success">
                            Total: {tshirt[0].price + longsleeve[0].price}€
                        </p>
                    )}
                {tshirt.length > 0 &&
                    !longsleeve.length &&
                    vinyl.length > 0 && (
                        <p className="success">
                            Total: {tshirt[0].price + vinyl[0].price}€
                        </p>
                    )}
                {!tshirt.length &&
                    longsleeve.length > 0 &&
                    vinyl.length > 0 && (
                        <p className="success">
                            Total: {longsleeve[0].price + vinyl[0].price}€
                        </p>
                    )}
                {tshirt.length > 0 &&
                    longsleeve.length > 0 &&
                    vinyl.length > 0 && (
                        <p className="success">
                            Total:
                            {tshirt[0].price +
                                longsleeve[0].price +
                                vinyl[0].price}
                            €
                        </p>
                    )}
                <button onClick={submitOrder}>Submit Order</button>
            </div>

            {modal == "visible" && (
                <div className="thankyou-modal">
                    <a id="x-modal" onClick={closeModal}>
                        X
                    </a>
                    <div className="modal-container">
                        <h1 className="thanks">THANK YOU!</h1>
                        <h3 className="thanks">
                            We've just received your order,you'll be contacted
                            in a few days about shipment and payment methods
                        </h3>
                        <div className="order-container">
                            <h2 className="success">Your Order:</h2>
                            {order.map((each) => (
                                <div
                                    key={each.order_id}
                                    className="item-container"
                                >
                                    <img
                                        src={each.imgurl}
                                        className="small-pic"
                                    />
                                    <p className="success">
                                        {each.vinyl || each.tshirt}
                                    </p>

                                    <p className="success">
                                        {each.size || each.color}
                                    </p>
                                    <p className="success">
                                        Price: {each.price}€
                                    </p>
                                </div>
                            ))}
                            <p className="success total">Total: {total}€</p>
                            <p className="address">
                                {order[0].first} {order[0].last}
                            </p>
                            <p className="address">{order[0].address}</p>
                            <p className="address">
                                {order[0].zip},{order[0].city}
                            </p>
                            <p className="address">{order[0].country}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
