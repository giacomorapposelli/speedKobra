import React, { useEffect, useRef } from "react";
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
        <div className="chat">
            <h1 className="chat-title">Welcome to Chat</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((each) => (
                        <div key={each.message_id} className="msg-container">
                            <div className="text">
                                <p>"{each.message}"</p>
                                <p className="name">
                                    By {each.first} {each.last}
                                </p>
                                <p className="date">
                                    {each.created_at
                                        .replace("T", " at ")
                                        .slice(0, -8)}
                                </p>
                            </div>
                            <img
                                className="res-avatar"
                                src={each.imgurl || "notyet.png"}
                            />
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
                className="chat-textarea"
            ></textarea>
        </div>
    );
}
