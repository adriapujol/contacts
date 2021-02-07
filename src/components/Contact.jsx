import React from 'react';
import './Contact.scss';

const Contact = ({ contact, setContacts, setEdit, setShowForm }) => {

    const { _id, name, lastName, email, phone } = contact;

    const deleteUser = async (id) => {
        try {
            let response = await fetch(`http://localhost:3001/contacts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                setContacts(prevContacts => {
                    const newContacts = prevContacts.filter(contact => contact._id !== id);
                    return newContacts;
                })
                //HANDLE DELETE RESPONSE
                console.log("Deleted succesfully");
            } else {
                //HANDE DELETE ERROR
                console.error("Could not delete");
            }
        } catch (err) {
            // HANDLE SERVER ERROR
            console.log(err);
        }
    };

    const editContact = () => {
        setEdit(contact);
        setShowForm(true);
    }


    return (
        <div className="contact-card">
            <div className="name">{name}</div>
            <div className="lastname">{lastName}</div>
            <div className="email">{email}</div>
            <div className="phone">{phone}</div>
            <div className="edit-user" onClick={editContact} >EDIT</div>
            <div className="delete-user" onClick={() => deleteUser(_id)} >DELETE</div>
        </div>
    )
}

export default Contact
