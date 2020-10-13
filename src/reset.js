import React from "react";
import axios from "./axios.js";
import VinylSlider from "./vinylslider";
// import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            newPassword: "",
            newPassword2: "",
            error: false,
            count: 0,
            noMatch: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
        this.handleSubmitCode = this.handleSubmitCode.bind(this);
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
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
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
        document.body.style.overflow = "hidden";
        this.setState({
            vinylSlider: "visible",
            overlay: "overlay",
        });
    }

    setTapeModal(event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        this.setState({
            tapeModal: "visible",
            overlay: "overlay",
        });
    }

    closeModal(event) {
        event.preventDefault();
        document.body.style.overflow = "scroll";
        this.setState({
            vinylSlider: "hidden",
            tapeModal: "hidden",
            tshirtModal: "hidden",
            longsleeveModal: "hidden",
            overlay: "",
        });
    }

    setTshirtModal(event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        this.setState({
            tshirtModal: "visible",
            overlay: "overlay",
        });
    }

    setLongsleeveModal(event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        this.setState({
            longsleeveModal: "visible",
            overlay: "overlay",
        });
    }

    handleSubmitEmail(event) {
        event.preventDefault();
        axios
            .post("/password/reset/start", { email: this.state.email })
            .then((response) => {
                this.setState({
                    count: 1,
                });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
            });
    }

    handleSubmitCode(event) {
        event.preventDefault();
        axios
            .post("/password/reset/verify", this.state)
            .then((response) => {
                if (response.data.noMatch) {
                    this.setState({
                        noMatch: true,
                    });
                } else {
                    this.setState({
                        count: 2,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
            });
    }

    getCurrentDisplay() {
        if (this.state.count === 0) {
            return (
                <div className="reset">
                    <h2 className="login-title">ENTER YOUR EMAIL:</h2>
                    <div className="reset-form">
                        <form
                            onSubmit={this.handleSubmitEmail}
                            className="login-form"
                        >
                            <input
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                                placeholder="Email"
                                required
                                onFocus={this.resetError}
                            />
                            <button className="reg-btn">Submit</button>
                            <p className="already">
                                <a
                                    className="login-link"
                                    onClick={this.props.setLogin}
                                >
                                    Back to Log in
                                </a>
                            </p>
                        </form>
                        {this.state.error && (
                            <p className="error">Email does not exist</p>
                        )}
                    </div>
                </div>
            );
        } else if (this.state.count === 1) {
            return (
                <div className="reset">
                    <div className="reset-form">
                        <h2 className="login-title">
                            ENTER THE CODE AND YOUR NEW PASSWORD
                        </h2>
                        <form
                            onSubmit={this.handleSubmitCode}
                            className="login-form"
                        >
                            <input
                                type="text"
                                name="code"
                                value={this.state.code}
                                onChange={this.handleChange}
                                placeholder="Your Code"
                                required
                                onFocus={this.resetError}
                            />
                            <input
                                type="password"
                                name="newPassword"
                                onChange={this.handleChange}
                                placeholder="Your New Password"
                                required
                                onFocus={this.resetError}
                            />
                            <input
                                type="password"
                                name="newPassword2"
                                onChange={this.handleChange}
                                placeholder="Confirm Password"
                                required
                                onFocus={this.resetError}
                            />
                            <button className="reg-btn">Submit</button>
                            {this.state.error && (
                                <p className="error">Wrong Code</p>
                            )}
                            {this.state.noMatch && (
                                <p className="reg-error">
                                    Passwords don't match
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="reset">
                    <div className="reset-form">
                        <h2 className="login-title">SUCCESS!</h2>
                        <h3 className="success-msg">
                            You can now{" "}
                            <a
                                className="login-link"
                                onClick={this.props.setLogin}
                            >
                                Log in{" "}
                            </a>
                            with your new password!
                        </h3>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="shop-general">
                <div
                    className={this.state.overlay}
                    onClick={this.closeModal}
                ></div>
                <div className="products">
                    <div className="row">
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="tshirt.jpg"
                                    className="item-img"
                                    onClick={this.setTshirtModal}
                                />

                                <form>
                                    <select name="size">
                                        <option value="-">
                                            Choose a size:
                                        </option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                    <button
                                        onClick={this.setError1}
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
                                {this.state.error1 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="longsleeve.jpg"
                                    className="item-img"
                                    onClick={this.setLongsleeveModal}
                                />
                                <form>
                                    <select name="size">
                                        <option value="-">
                                            Choose a size:
                                        </option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                    <button
                                        onClick={this.setError2}
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
                                {this.state.error2 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="vinyl-red.jpg"
                                    className="item-img"
                                    onClick={this.setVinylModal}
                                />
                                <form>
                                    <select name="color">
                                        <option value="-">
                                            Choose a color:
                                        </option>
                                        <option value="Clear Red">RED</option>
                                        <option value="Clear Green">
                                            GREEN
                                        </option>
                                        <option value="Blue">BLUE</option>
                                        <option value="Light Blue">
                                            LIGHT BLUE
                                        </option>
                                    </select>
                                    <button
                                        onClick={this.setError3}
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
                                {this.state.error3 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="tape2.jpg"
                                    className="item-img"
                                    onClick={this.setTapeModal}
                                />
                                <form>
                                    <select>
                                        <option value="-">--</option>
                                    </select>
                                    <button
                                        onClick={this.setError4}
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
                                {this.state.error4 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.vinylSlider == "visible" && (
                    <VinylSlider closeModal={this.closeModal} />
                )}
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
                {this.getCurrentDisplay(this.state.count)}
            </div>
        );
    }
}
