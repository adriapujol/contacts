import React from 'react';
import './Contact.scss';

const Contact = ({id, name, lastName, email, phone }) => {
    return (
        <div className="contact-card">
            <div className="name">{name}</div>
            <div className="lastname">{lastName}</div>
            <div className="email">{email}</div>
            <div className="phone">{phone}</div>
        </div>
    )
}

export default Contact
