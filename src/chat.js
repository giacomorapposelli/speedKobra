import React, { useState, useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.chatMessages);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        console.log("CHAT MESSAGES: ", chatMessages);
    }, [chatMessages]);

    const keyCheck = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            socket.emit("My amazing chat message", event.target.value);
            event.target.value = "";
        }
    };

    return (
        <div>
            <p className="chat-title">Welcome to Chat</p>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((each) => (
                        <div key={each.message_id}>
                            <p>"{each.message}"</p>
                            <div>
                                <p>
                                    By {each.first} {each.last}
                                </p>
                                <p>
                                    {each.created_at
                                        .replace("T", " at ")
                                        .slice(0, -8)}
                                </p>
                                <img
                                    className="res-avatar"
                                    src={each.imgurl || "notyet.png"}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
