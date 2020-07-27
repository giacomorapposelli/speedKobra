import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import VinylSlider from "./vinylslider";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            zip: "",
            city: "",
            country: "",
            password: "",
            vinylSlider: "hidden",
            tapeModal: "hidden",
            tshirtModal: "hidden",
            longsleeveModal: "hidden",
            overlay: "",
            error: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetError = this.resetError.bind(this);
        this.setError1 = this.setError1.bind(this);
        this.setError2 = this.setError2.bind(this);
        this.setError3 = this.setError3.bind(this);
        this.setError4 = this.setError4.bind(this);
        this.setVinylModal = this.setVinylModal.bind(this);
        this.setTapeModal = this.setTapeModal.bind(this);
        this.setTshirtModal = this.setTshirtModal.bind(this);
        this.setLongsleeveModal = this.setLongsleeveModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .post("/register", this.state)
            .then((response) => {
                location.replace("/#/cart");
                console.log("RISPOSTA: ", response);
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("error: ", err);
            });
    }

    resetError(event) {
        event.preventDefault();
        this.setState({
            error: false,
        });
    }

    setError1(event) {
        event.preventDefault();
        this.setState({
            error1: true,
        });
    }

    setError2(event) {
        event.preventDefault();
        this.setState({
            error2: true,
        });
    }

    setError3(event) {
        event.preventDefault();
        this.setState({
            error3: true,
        });
    }

    setError4(event) {
        event.preventDefault();
        this.setState({
            error4: true,
        });
    }

    setVinylModal(event) {
        event.preventDefault();
        this.setState({
            vinylSlider: "visible",
            overlay: "overlay",
        });
    }

    setTapeModal(event) {
        event.preventDefault();
        this.setState({
            tapeModal: "visible",
            overlay: "overlay",
        });
    }

    setTshirtModal(event) {
        event.preventDefault();
        this.setState({
            tshirtModal: "visible",
            overlay: "overlay",
        });
    }

    setLongsleeveModal(event) {
        this.setState({
            longsleeveModal: "visible",
            overlay: "overlay",
        });
    }

    closeModal(event) {
        event.preventDefault();
        this.setState({
            vinylSlider: "hidden",
            tapeModal: "hidden",
            tshirtModal: "hidden",
            longsleeveModal: "hidden",
            overlay: "",
        });
    }

    render() {
        return (
            <div className="shop-general">
                <div
                    className={this.state.overlay}
                    onClick={this.closeModal}
                ></div>
                <div className="row">
                    <div className="merch-card">
                        <img
                            src="tshirt.jpg"
                            className="item-img"
                            onClick={this.setTshirtModal}
                        />

                        <form>
                            <select name="size">
                                <option value="-">Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                            <button onClick={this.setError1}>
                                Add to cart
                            </button>
                        </form>
                    </div>
                    <div className="description">
                        <p className="item-name">"Harvester Of Hate"</p>
                        <p className="item-name">T-Shirt</p>
                        <p className="item-name">Price 10€</p>
                        {this.state.error1 && (
                            <p className="error">
                                You need to be registered in order to buy
                                something
                            </p>
                        )}
                    </div>

                    <div className="merch-card">
                        <img
                            src="longsleeve.jpg"
                            className="item-img"
                            onClick={this.setLongsleeveModal}
                        />
                        <form>
                            <select name="size">
                                <option value="-">Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                            <button onClick={this.setError2}>
                                Add to cart
                            </button>
                        </form>
                    </div>
                    <div className="description">
                        <p className="item-name">"Dehumanized"</p>
                        <p className="item-name">Longsleeve</p>
                        <p className="item-name">Price 15€</p>
                        {this.state.error2 && (
                            <p className="error">
                                You need to be registered in order to buy
                                something
                            </p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="merch-card">
                        <img
                            src="vinyl-red.jpg"
                            className="item-img"
                            onClick={this.setVinylModal}
                        />
                        <form>
                            <select name="color">
                                <option value="-">Color</option>
                                <option value="Clear Red">RED</option>
                                <option value="Clear Green">GREEN</option>
                                <option value="Blue">BLUE</option>
                                <option value="Light Blue">LIGHT BLUE</option>
                            </select>
                            <button onClick={this.setError3}>
                                Add to cart
                            </button>
                        </form>
                    </div>
                    <div className="description">
                        <p className="item-name">Days Of Madness</p>
                        <p className="item-name">LP 12"</p>
                        <p className="item-name">Price 12€</p>
                        {this.state.error3 && (
                            <p className="error">
                                You need to be registered in order to buy
                                something
                            </p>
                        )}
                    </div>

                    <div className="merch-card">
                        <img
                            src="tape.jpg"
                            className="item-img"
                            onClick={this.setTapeModal}
                        />
                        <form>
                            <select>
                                <option value="-">--</option>
                            </select>
                            <button onClick={this.setError4}>
                                Add to cart
                            </button>
                        </form>
                    </div>
                    <div className="description">
                        <p className="item-name">Split w/ Moratory</p>
                        <p className="item-name">Tape</p>
                        <p className="sold-out">Sold Out</p>
                        {this.state.error4 && (
                            <p className="error">
                                You need to be registered in order to buy
                                something
                            </p>
                        )}
                    </div>
                </div>
                <div className="registration">
                    <h2 className="reg-title">
                        REGISTER HERE IN ORDER TO BUY SOMETHING
                    </h2>
                    <form onSubmit={this.handleSubmit} className="reg-form">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Street Name and Number"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <button>Register</button>
                        <p>
                            Already a member?
                            <Link to="/log">Log in</Link>
                        </p>
                        {this.state.error && (
                            <p className="error">
                                Something went wrong,please try again
                            </p>
                        )}
                    </form>
                </div>
                {this.state.vinylSlider == "visible" && <VinylSlider />}
                {this.state.tapeModal == "visible" && (
                    <div className="tape-modal">
                        <a id="x-modal" onClick={this.closeModal}>
                            X
                        </a>
                        <img src="/tape.jpg" className="tapephoto" />
                    </div>
                )}
                {this.state.tshirtModal == "visible" && (
                    <div className="tshirt-modal">
                        <a id="x-modal" onClick={this.closeModal}>
                            X
                        </a>
                        <img src="/tshirt.jpg" className="tshirtphoto" />
                    </div>
                )}
                {this.state.longsleeveModal == "visible" && (
                    <div className="longsleeve-modal">
                        <a id="x-modal" onClick={this.closeModal}>
                            X
                        </a>
                        <img
                            src="/longsleeve.jpg"
                            className="longsleevephoto"
                        />
                    </div>
                )}
            </div>
        );
    }
}
