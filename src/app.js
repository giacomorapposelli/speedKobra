import React from "react";
import axios from "./axios";
import Uploader from "./upload";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import FindPeople from "./findpeople";
import Friends from "./friends";
import Chat from "./chat";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            <BrowserRouter>
                <header className="head">
                    <a className="hello">Hello, {this.state.firstname}</a>
                    <img className="logo" src="/palm.jpg" />
                    <Link to="/find" className="find">
                        Find People
                    </Link>
                    <Link to="/chat" className="chat-link">
                        Chat
                    </Link>
                    <Link to="/">
                        <img
                            className="avatar"
                            src={this.state.profilePic}
                            onClick={this.openModal}
                        />
                    </Link>
                    <Link to="/friends" className="friends-link">
                        Friends
                    </Link>
                    <a href="/logout" className="logout">
                        Log out
                    </a>
                </header>
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
                <Route
                    exact
                    path="/user/:id"
                    render={(props) => (
                        <OtherProfile
                            id={props.match.params.id}
                            match={props.match}
                        />
                    )}
                />
                <Route exact path="/find" component={FindPeople} />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={this.setImage}
                        closeModal={this.closeModal}
                    />
                )}
                <Route
                    exact
                    path="/friends"
                    render={(props) => <Friends id={props.match.params.id} />}
                />
                <Route path="/chat" component={Chat} />
                <footer>
                    <p className="elrappo">© 2020 El Rappo</p>
                </footer>
            </BrowserRouter>
        );
    }
}
