import React from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioeditor";
import axios from "./axios";

export default function Profile(props) {
    console.log("props in Profile: ", props);

    const removeAccount = () => {
        axios.post("/delete-account/" + props.id).then(() => {
            location.replace("/");
        });
    };

    return (
        <div className="profile-container">
            <h1>
                {props.firstname} {props.lastname}
            </h1>
            <ProfilePic
                openModal={props.openModal}
                setImage={props.setImage}
                profilePic={props.profilePic}
            />
            <BioEditor bio={props.bio} setBio={props.setBio} />
            <button onClick={removeAccount}>Delete Your Account</button>
        </div>
    );
}
