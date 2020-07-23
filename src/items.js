import React from "react";
import axios from "./axios";
import { render } from "react-dom";

export default class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.addTshirt1 = this.addTshirt1.bind(this);
        this.addTshirt2 = this.addTshirt2.bind(this);
        this.addVinyl = this.addVinyl.bind(this);
        this.handleChange = this.handleChange(this);
    }

    handleChange(event) {
        // this.setState({ [event.target.name]: event.target.value });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    addTshirt1(event) {
        event.preventDefault();
        axios
            .post("/addthsirt1")
            .then((response) => {
                this.setState(response.data);
                console.log("TSHIRT 1: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    }

    addTshirt2(event) {
        event.preventDefault();
        axios
            .post("/addthsirt2")
            .then((response) => {
                this.setState(response.data);
                console.log("TSHIRT 2: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    }

    addVinyl(event) {
        event.preventDefault();
        axios
            .post("/addvinyl")
            .then((response) => {
                this.setState(response.data);
                console.log("VINYL: ", response.data);
            })
            .catch((err) => console.log("ERRORE: ", err));
    }

    render() {
        return (
            <div className="shop-general">
                <div className="row">
                    <div className="merch-card">
                        <p className="diocane">tshirt1</p>
                        <form>
                            <label htmlFor="sizes" className="success">
                                Size:
                            </label>
                            <select name="size" onChange={this.handleChange}>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                            <button onClick={this.addTshirt1}>
                                Add to cart
                            </button>
                        </form>
                    </div>

                    <div className="merch-card">
                        <p className="diocane">tshrt2</p>
                        <form>
                            <label htmlFor="sizes" className="success">
                                Size:
                            </label>
                            <select name="size" onChange={this.handleChange}>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                            <button onClick={this.addTshirt2}>
                                Add to cart
                            </button>
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
                            <select name="color" onChange={this.handleChange}>
                                <option value="red">RED</option>
                                <option value="yellow">YELLOW</option>
                                <option value="green">GREEN</option>
                                <option value="light-blue">LIGHT BLUE</option>
                            </select>
                            <button onClick={this.addVinyl}>Add to cart</button>
                        </form>
                    </div>

                    <div className="merch-card">
                        <p className="diocane">Sold Out</p>
                    </div>
                </div>
            </div>
        );
    }
}
