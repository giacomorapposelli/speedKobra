import React from "react";
import axios from "./axios";

import ProfilePic from "./profilePic";
import Uploader from "./upload";

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
    }

    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("RESP: ", response);
            if (response.data.profilePic === undefined) {
                response.data.profilePic = "/notyet.png";
            }
            this.setState({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                profilePic: response.data.profilePic,
            });
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

    render() {
        console.log("this.state: ", this.state);
        return (
            <div>
                <h1>App</h1>
                <ProfilePic
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    profilePic={this.state.profilePic}
                    openModal={this.openModal}
                    setImage={this.setImage}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={this.setImage}
                        closeModal={this.closeModal}
                    />
                )}
            </div>
        );
    }
}
