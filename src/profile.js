import React, { useState } from "react";
import ProfilePic from "./profilePic";
import BioEditor from "./bioeditor";
import axios from "./axios";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    const [modal, setModal] = useState(false);

    const removeAccount = () => {
        axios.post("/delete-account/" + props.id).then(() => {
            location.replace("/");
        });
    };

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
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
            <button onClick={openModal} className="delete-btn">
                Delete Your Account
            </button>
            {modal && (
                <div className="sure-modal">
                    <h4>Are you sure you want to delete your account?</h4>
                    <div className="sure-btns">
                        <button onClick={removeAccount}>Yes</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}
