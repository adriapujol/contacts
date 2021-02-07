import React, { useState } from 'react';
import './Form.scss';

const Form = ({ setContacts, contact, setShowForm, setEdit }) => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const addContact = async () => {
        if (name === '' || lastName === '' || email === '' || phone === '') {

            // HANDLE MISSING FIELDS
            console.log("All fields required");
            // return alert("Wrong");
        }
        const data = { name: name, lastName: lastName, email: email, phone: phone };
        try {
            let response = await fetch('http://localhost:3001/new', {
                method: 'POST',
                headers: {
                    "Accpet": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            let json = await response.json();
            if (json.message) {
                console.log(json);
            } else {
                setContacts(prevContacts => {
                    return [...prevContacts, json]
                })
                setShowForm(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const editContact = async (id) => {
        const data = { name: name, lastName: lastName, email: email, phone: phone };

        if (data.name === '') data.name = contact.name;
        if (data.lastName === '') data.lastName = contact.lastName;
        if (data.email === '') data.email = contact.email;
        if (data.phone === '') data.phone = contact.phone;

        try {
            let response = await fetch(`http://localhost:3001/edit/${contact._id}`, {
                method: 'PUT',
                headers: {
                    "Accpet": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            let json = await response.json();
            if (json.message) {
                console.error(json);
            } else {
                console.log("UPADTE RESPONSE: ", json);
                setContacts(prevContacts => {
                    const newContacts = prevContacts.map(contact => contact._id === id ? json : contact);
                    return [...newContacts]
                })
                setShowForm(false);
            }
        } catch (err) {
            console.log("NO SERVER THIS");
            console.error(err);
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
                <label>Name</label>
                <input type="text" onChange={e => setName(e.target.value)} placeholder={contact ? contact.name : null} />
                <label>Last Name</label>
                <input type="text" onChange={e => setLastName(e.target.value)} placeholder={contact ? contact.lastName : null} />
                <label>Email</label>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder={contact ? contact.email : null} />
                <label>Phone</label>
                <input type="text" onChange={e => setPhone(e.target.value)} placeholder={contact ? contact.phone : null} />
                <button type="submit" onClick={contact ? () => { editContact(contact._id) } : addContact}>{contact ? "SAVE" : "ADD"}</button>
            </div>
        </div>
    )
}

export default Form
