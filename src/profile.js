import React from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioeditor";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div>
            <h1>
                {props.firstname} {props.lastname}
            </h1>
            <ProfilePic
                openModal={props.openModal}
                setImage={props.setImage}
                profilePic={props.profilePic}
            />
            <BioEditor bio={props.bio} setBio={props.setBio} />
        </div>
    );
}
