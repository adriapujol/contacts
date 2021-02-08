import React from 'react';
import './Message.scss';

const Message = ({ message, type }) => {
    return (
        <div className="message-wrapper">
            <div className={`message ${type === "error" ? "error" : "success"}`}>
                {message}
            </div>
        </div>
    )
}

export default Message
