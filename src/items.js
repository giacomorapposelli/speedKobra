import React, { useEffect, useState } from "react";
import axios from "./axios";
import VinylSlider from "./vinylslider";

export default function Items(props) {
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [order, setOrder] = useState([]);
    const [thankYouModal, setThankYouModal] = useState("hidden");
    const [vinylSlider, setVinylSlider] = useState("hidden");
    const [tapeModal, setTapeModal] = useState("hidden");
    const [longsleeveModal, setLongsleeveModal] = useState("hidden");
    const [confirmModal, setConfirmModal] = useState("hidden");
    const [tshirtModal, setTshirtModal] = useState("hidden");
    const [total, setTotal] = useState();
    const [className, setClassName] = useState();
    const [soldOut, setSoldOut] = useState("");
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [currentCart, setCurrentCart] = useState([]);
    const [name, setName] = useState("");

    let sum = 0;
    let tempSum = 0;

    const addTshirt = (event) => {
        event.preventDefault();
        axios
            .post("/addthsirt", { size })
            .then((response) => {
                setCurrentCart([...currentCart, response.data]);
            })
            .catch((err) => {
                setError(true);
            });
    };

    const addLongsleeve = (event) => {
        event.preventDefault();
        axios
            .post("/addlongsleeve", { size })
            .then((response) => {
                setCurrentCart([...currentCart, response.data]);
            })
            .catch((err) => {
                setTimeout(function () {
                    setError("Choose a size!");
                }, 3000);
            });
    };

    const addVinyl = (event) => {
        event.preventDefault();
        axios
            .post("/addvinyl", { color })
            .then((response) => {
                setCurrentCart([...currentCart, response.data]);
            })
            .catch((err) => {
                setTimeout(function () {
                    setError("Choose a color!");
                }, 3000);
            });
    };

    const submitOrder = (event) => {
        event.preventDefault();
        axios
            .get("/order")
            .then((response) => {
                setOrder(response.data);
                setThankYouModal("visible");
                setClassName("overlay");
                setConfirmModal("hidden");
                setCurrentCart([]);
            })
            .catch((err) => {
                console.log("ERROR IN ORDER: ", err);
            });
    };

    const closeModal = (event) => {
        event.preventDefault();
        document.body.style.overflow = "scroll";
        setThankYouModal("hidden");
        setVinylSlider("hidden");
        setTapeModal("hidden");
        setTshirtModal("hidden");
        setLongsleeveModal("hidden");
        setConfirmModal("hidden");
        setClassName("");
    };

    const soldOutError = (event) => {
        event.preventDefault();
        setSoldOut("This item is sold out");
        setTimeout(function () {
            setSoldOut("");
        }, 3000);
    };

    const setVinylModal = (event) => {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        setVinylSlider("visible");
        setClassName("overlay");
    };

    const openTapeModal = (event) => {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        setTapeModal("visible");
        setClassName("overlay");
    };

    const openTshirtModal = (event) => {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        setTshirtModal("visible");
        setClassName("overlay");
    };

    const openLongsleeveModal = (event) => {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        setLongsleeveModal("visible");
        setClassName("overlay");
    };

    const removeitem = (event) => {
        const itemId = event.target.parentElement.id;
        const items = currentCart.filter((each) => each.id != itemId);
        setCurrentCart(items);
        axios.post("/removeitem", { itemId });
    };

    const confirmOrder = (event) => {
        event.preventDefault();
        setConfirmModal("visible");
        setClassName("overlay");
    };
    const handleLogout = () => {
        setCurrentCart([]);
        localStorage.clear();
    };

    useEffect(() => {
        axios
            .get("/firstname")
            .then((response) => {
                setName(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get("/code")
            .then((response) => {
                setCode(response.data.orderCode);
            })
            .catch((err) => console.log(err));

        order.map((each) => {
            sum += each.price;
        });

        setTotal(sum);
    }, [order]);
    return (
        <div className="shop-general">
            <div className={className} onClick={closeModal} id="shop"></div>
            <div className="products">
                <div className="row">
                    <div className="item-wrapper">
                        <div className="merch-card">
                            <img
                                src="tshirt.jpg"
                                className="item-img"
                                onClick={openTshirtModal}
                            />

                            <form>
                                <select
                                    name="size"
                                    onChange={(event) =>
                                        setSize(event.target.value)
                                    }
                                >
                                    <option value="">Choose a size:</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                                <button
                                    onClick={addTshirt}
                                    className="addtocart"
                                >
                                    Add to cart
                                </button>
                            </form>
                        </div>
                        <div className="description">
                            <p className="item-name">"Harvester Of Hate"</p>
                            <p className="item-name">T-Shirt</p>
                            <p className="item-name">Price: 10€</p>
                            {<p className="error">{error}</p>}
                        </div>
                    </div>
                    <div className="item-wrapper">
                        <div className="merch-card">
                            <img
                                src="longsleeve.jpg"
                                className="item-img"
                                onClick={openLongsleeveModal}
                            />
                            <form>
                                <select
                                    name="size"
                                    onChange={(event) =>
                                        setSize(event.target.value)
                                    }
                                >
                                    <option value="">Choose a size:</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                                <button
                                    onClick={addLongsleeve}
                                    className="addtocart"
                                >
                                    Add to cart
                                </button>
                            </form>
                        </div>
                        <div className="description">
                            <p className="item-name">"Dehumanized"</p>
                            <p className="item-name">Longsleeve</p>
                            <p className="item-name">Price: 15€</p>
                            <p className="error">{error}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="item-wrapper">
                        <div className="merch-card">
                            <img
                                src="vinyl-red.jpg"
                                className="item-img"
                                onClick={setVinylModal}
                            />
                            <form>
                                <select
                                    name="color"
                                    onChange={(event) =>
                                        setColor(event.target.value)
                                    }
                                >
                                    <option value="">Choose a color:</option>
                                    <option value="Red">RED</option>
                                    <option value="Green">GREEN</option>
                                    <option value="Blue">BLUE</option>
                                    <option value="Light Blue">
                                        LIGHT BLUE
                                    </option>
                                </select>
                                <button
                                    onClick={addVinyl}
                                    className="addtocart"
                                >
                                    Add to cart
                                </button>
                            </form>
                        </div>
                        <div className="description">
                            <p className="item-name">Days Of Madness</p>
                            <p className="item-name">LP 12"</p>
                            <p className="item-name">Price: 12€</p>
                            <p className="error">{error}</p>
                        </div>
                    </div>
                    <div className="item-wrapper">
                        <div className="merch-card">
                            <img
                                src="tape2.jpg"
                                className="item-img"
                                onClick={openTapeModal}
                            />
                            <form>
                                <select>
                                    <option value="-">--</option>
                                </select>
                                <button
                                    onClick={soldOutError}
                                    className="addtocart"
                                >
                                    Add to cart
                                </button>
                            </form>
                        </div>
                        <div className="description">
                            <p className="item-name">Split w/ Moratory</p>
                            <p className="item-name">Tape</p>
                            <p className="sold-out">Sold Out</p>
                            {soldOut && <p className="error">{soldOut}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart">
                <div className="user-info">
                    <p className="hello">Hello, {name}!</p>
                    <a
                        href="/logout"
                        className="logout-link"
                        onClick={handleLogout}
                    >
                        Log Out
                    </a>
                    <a className="edit-link" onClick={props.setEdit}>
                        Edit Your Billing Address
                    </a>
                </div>
                <h2 className="cart-title">YOUR CART:</h2>
                {!currentCart.length && (
                    <div className="empty-cart">
                        <h2 className="empty">Your Cart is now empty</h2>
                        <img
                            src="/empty-cart.png"
                            alt=""
                            className="empty-icon"
                        />
                    </div>
                )}
                <div className="cart-container">
                    {currentCart &&
                        currentCart.length > 0 &&
                        currentCart.map((each) => {
                            return (
                                <div
                                    key={each.id}
                                    className="resume-container"
                                    id={each.id}
                                >
                                    <img
                                        src={each.imgurl}
                                        className="small-pic"
                                    />
                                    <p className="item-name">
                                        {each.tshirt || each.vinyl}
                                    </p>
                                    <p className="item-desc">
                                        {each.size
                                            ? "Size: " + each.size
                                            : "Color: " + each.color}
                                    </p>
                                    <p className="success">
                                        Price: {each.price}€
                                    </p>
                                    <img
                                        src="/delete.png"
                                        className="social-logo"
                                        onClick={removeitem}
                                    />
                                </div>
                            );
                        })}
                </div>
                {currentCart.length > 0 && (
                    <p className="success" className="temp-total">
                        Total: {tempSum}€
                    </p>
                )}
                {currentCart.length > 0 && (
                    <button
                        onClick={confirmOrder}
                        id="submit-btn"
                        className="submit-btn"
                    >
                        Submit Order
                    </button>
                )}
            </div>

            {thankYouModal == "visible" && (
                <div className="thankyou-modal">
                    <a id="x-modal" onClick={closeModal}>
                        X
                    </a>
                    <div className="modal-container">
                        <h1 className="thanks">THANK YOU!</h1>
                        <h3 className="thanks">
                            We've just received your order.You'll be contacted
                            in a few days about shipment and payment methods
                        </h3>
                        <div className="order-container">
                            <h2 className="code">Order Code: {code}</h2>
                            {order.map((each) => (
                                <div
                                    key={each.order_id}
                                    className="item-container"
                                >
                                    <img
                                        src={each.imgurl}
                                        className="small-pic"
                                    />
                                    <p className="item-name">
                                        {each.vinyl || each.tshirt}
                                    </p>

                                    <p className="item-desc">
                                        {each.size
                                            ? "Size: " + each.size
                                            : "Color: " + each.color}
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
            {confirmModal == "visible" && (
                <div className="confirm-modal">
                    <a id="x-conf-modal" onClick={closeModal}>
                        X
                    </a>
                    <h2 className="thanks">CONFIRM YOUR ORDER</h2>
                    <button onClick={submitOrder} className="conf-btn">
                        Confirm
                    </button>
                    <button onClick={closeModal} className="conf-btn">
                        Go back
                    </button>
                </div>
            )}
            {vinylSlider == "visible" && (
                <VinylSlider closeModal={closeModal} />
            )}
            {tapeModal == "visible" && (
                <div className="tape-modal">
                    <a id="x-modal" onClick={closeModal}>
                        X
                    </a>
                    <img src="/tape.jpg" className="tapephoto" />
                </div>
            )}
            {tshirtModal == "visible" && (
                <div className="tshirt-modal">
                    <a id="x-modal" onClick={closeModal}>
                        X
                    </a>
                    <img src="/tshirt.jpg" className="tshirtphoto" />
                </div>
            )}
            {longsleeveModal == "visible" && (
                <div className="longsleeve-modal">
                    <a id="x-modal" onClick={closeModal}>
                        X
                    </a>
                    <img src="/longsleeve.jpg" className="longsleevephoto" />
                </div>
            )}
        </div>
    );
}
