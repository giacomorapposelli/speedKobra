import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            newPassword: "",
            error: false,
            count: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
        this.handleSubmitCode = this.handleSubmitCode.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    resetError(event) {
        event.preventDefault();
        this.setState({
            error: false,
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
                this.setState({
                    count: 2,
                });
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
                <div className="reset-form">
                    <h2>Enter your Email</h2>
                    <form
                        onSubmit={this.handleSubmitEmail}
                        className="input-fields"
                    >
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            placeholder="Email"
                            required
                            onFocus={this.resetError}
                        />
                        <button>Submit</button>
                    </form>
                    {(this.state.error && (
                        <p className="error">Email does not exist</p>
                    )) || <p className="no-error">Email does not exist</p>}
                </div>
            );
        } else if (this.state.count === 1) {
            return (
                <div className="reset-form">
                    <h2>Enter the code and reset your Password</h2>
                    <form
                        onSubmit={this.handleSubmitCode}
                        className="input-fields"
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
                        <button>Submit</button>
                        {(this.state.error && (
                            <p className="error">Wrong Code</p>
                        )) || <p className="no-error">Wrong Code</p>}
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Success!</h2>
                    <p>
                        you can now <Link to="/login">Log in </Link>with your
                        new password
                    </p>
                </div>
            );
        }
    }

    render() {
        return <div>{this.getCurrentDisplay(this.state.count)}</div>;
    }
}
