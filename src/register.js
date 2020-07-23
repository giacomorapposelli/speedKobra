import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
            error: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetError = this.resetError.bind(this);
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
                // this.setState({ success: true });
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                </form>
                <p>
                    Already a member?
                    <Link to="/log"> Log in</Link>
                </p>
                {this.state.error && (
                    <p className="error">
                        Something went wrong,please try again
                    </p>
                )}
                {this.state.success && (
                    <p className="success">REGISTER SUCCES</p>
                )}
            </div>
        );
    }
}
