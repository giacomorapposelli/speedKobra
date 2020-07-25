import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetError = this.resetError.bind(this);
        this.setError1 = this.setError1.bind(this);
        this.setError2 = this.setError2.bind(this);
        this.setError3 = this.setError3.bind(this);
        this.setError4 = this.setError4.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post("/login", this.state)
            .then((response) => {
                location.replace("/#/cart");
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

    render() {
        return (
            <div className="shop-general">
                <div className="row">
                    <div className="merch-card">
                        <img src="tshirt.jpg" className="item-img" />

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
                        <img src="longsleeve.jpg" className="item-img" />
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
                        <img src="vinyl-red.jpg" className="item-img" />
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
                        <img src="tape.jpg" className="item-img" />
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
                <div className="login">
                    <h2 className="login-title">LOG IN:</h2>
                    <form onSubmit={this.handleSubmit} className="login-form">
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            placeholder="Email"
                            required
                            onFocus={this.resetError}
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            placeholder="Password"
                            required
                            onFocus={this.resetError}
                        />
                        <button>Log in</button>
                        {this.state.error && (
                            <p className="error">
                                Email or Password aren't correct
                            </p>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}
