import React, { useState } from 'react';
import './Form.scss';

const Form = ({ setContacts, contact, setShowForm, setEdit }) => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const addContact = async () => {
        setErrorMessage('');
        if (name === '' || lastName === '' || email === '' || phone === '') setErrorMessage("All fields required");
        const data = { name: name, lastName: lastName, email: email, phone: phone };
        try {
            let response = await fetch('http://localhost:3001/contacts/new', {
                method: 'POST',
                headers: {
                    "Accpet": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            let json = await response.json();
            if (json.message) {
                setErrorMessage(json.message);
            } else {
                setContacts(prevContacts => {
                    return [...prevContacts, json]
                })
                setShowForm(false);
            }
        } catch {
            setErrorMessage("Something went wrong.");
        }
    }

    const editContact = async (id) => {

        setErrorMessage('');
        const data = { name: name, lastName: lastName, email: email, phone: phone };

        if (data.name === "") data.name = contact.name;
        if (data.lastName === "") data.lastName = contact.lastName;
        if (data.email === '') data.email = contact.email;
        if (data.phone === '') data.phone = contact.phone;

        try {
            let response = await fetch(`http://localhost:3001/contacts/edit/${contact._id}`, {
                method: 'PUT',
                headers: {
                    "Accpet": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            let json = await response.json();
            if (json.message) {
                setErrorMessage(json.message);
            } else {
                console.log("UPADTE RESPONSE: ", json);
                setContacts(prevContacts => {
                    const newContacts = prevContacts.map(contact => contact._id === id ? json : contact);
                    return [...newContacts]
                })
                setShowForm(false);
            }
        } catch {
            setErrorMessage("Something went wrong.");
        }

    }

    const closeForm = () => {
        setShowForm(false);
        if (contact) setEdit({});
    }


    return (
        <div className="add-container">
            <div className="add-form">
                <div className="close-form" onClick={closeForm}>close</div>
                <label>Name{contact ? null : "*"}</label>
                <input type="text" onChange={e => setName(e.target.value)} placeholder={contact ? contact.name : null} />
                <label>Last Name{contact ? null : "*"}</label>
                <input type="text" onChange={e => setLastName(e.target.value)} placeholder={contact ? contact.lastName : null} />
                <label>Email{contact ? null : "*"}</label>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder={contact ? contact.email : null} />
                <label>Phone{contact ? null : "*"}</label>
                <input type="text" onChange={e => setPhone(e.target.value)} placeholder={contact ? contact.phone : null} />
                {contact ? null : <div>(*)Required</div>}
                <div className="error-message">{errorMessage}</div>
                <button type="submit" onClick={contact ? () => { editContact(contact._id) } : addContact}>{contact ? "SAVE" : "ADD"}</button>
            </div>
        </div>
    )
}

export default Form
