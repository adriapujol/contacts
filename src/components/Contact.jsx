import React from 'react';
import './Contact.scss';

const Contact = ({ contact, setContacts, setEdit, setShowForm, setSuccessMessage, setErrorMessage }) => {

    const { _id, name, lastName, email, phone } = contact;

    const deleteUser = async (id) => {
        setErrorMessage("");
        setSuccessMessage("");
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
                setSuccessMessage("Contact deleted successfully");
            } else {
                //HANDE DELETE ERROR
                setErrorMessage("Couldn't delete the contact");
            }
        } catch {
            // HANDLE SERVER ERROR
            setErrorMessage("Couldn't delete the contact");
        }
    };

    const editContact = () => {
        setEdit(contact);
        setShowForm(true);
    }


    return (
        <div className="contact-card">

            <label>Full name:</label>
            <div className="info name">{`${name} ${lastName}`}</div>
            <label>Email:</label>
            <div className="info email">{email}</div>
            <label>Phone:</label>
            <div className="info phone">{phone}</div>
            <div className="control-box">
                <div className="edit-user" onClick={editContact} ><i className="fas fa-pen" /></div>
                <div className="delete-user" onClick={() => deleteUser(_id)} ><i className="fas fa-trash-alt" /></div>
            </div>
        </div>
    )
}

export default Contact
