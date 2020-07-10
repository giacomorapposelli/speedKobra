import React from "react";
import axios from "./axios";
import Uploader from "./upload";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("RESP APP: ", response.data);
            if (!response.data.profilePic) {
                response.data.profilePic = "/notyet.png";
            }
            this.setState(response.data);
        });
    }

    openModal() {
        this.setState({
            uploaderIsVisible: true,
        });
    }

    closeModal() {
        this.setState({
            uploaderIsVisible: false,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            profilePic: newProfilePic,
        });
    }

    setBio(newBio) {
        this.setState({
            draftBio: newBio,
        });
    }

    render() {
        console.log("this.state: ", this.state);
        return (
            <div>
                <header className="head">
                    <img className="logo" src="/palm.jpg" />
                    <img
                        className="avatar"
                        src={this.state.profilePic}
                        onClick={this.openModal}
                    />
                </header>
                <div className="container">
                    <BrowserRouter>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        profilePic={this.state.profilePic}
                                        openModal={this.openModal}
                                        bio={this.state.draftBio}
                                        setBio={this.setBio}
                                    />
                                )}
                            />
                            <Route path="/user/:id" component={OtherProfile} />
                        </div>
                    </BrowserRouter>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            setImage={this.setImage}
                            closeModal={this.closeModal}
                        />
                    )}
                </div>
            </div>
        );
    }
}
