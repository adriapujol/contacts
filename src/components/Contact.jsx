import React from 'react';
import './Contact.scss';

const Contact = ({ id, name, lastName, email, phone, setContacts }) => {

    const deleteUser = async (id) => {
        console.log('this is the ID FROM FRONTEND:', id);
        try {
            let response = await fetch(`http://localhost:3001/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                setContacts(prevContacts => {
                    const newContacts = prevContacts.filter(contact => contact._id !== id);
                    console.log(newContacts);
                    return newContacts;
                })
                console.log("Deleted succesfully");
            } else {
                console.error("Could not delete");
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="contact-card">
            <div className="name">{name}</div>
            <div className="lastname">{lastName}</div>
            <div className="email">{email}</div>
            <div className="phone">{phone}</div>
            <div className="delete-user" onClick={() => deleteUser(id)} >DELETE</div>
        </div>
    )
}

export default Contact
