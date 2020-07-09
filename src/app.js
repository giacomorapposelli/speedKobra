import React from "react";
import axios from "./axios";
import Uploader from "./upload";
import Profile from "./profile";

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
            console.log("RESP: ", response.data);
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
                    <Profile
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        profilePic={this.state.profilePic}
                        bio={this.state.draftBio}
                        openModal={this.openModal}
                        setImage={this.setImage}
                        setBio={this.setBio}
                    />
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
