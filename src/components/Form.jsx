import React, { useState, useEffect } from 'react';
import './Form.scss';

const Form = ({ setContacts, contact }) => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setLastName(contact.lastName);
            setEmail(contact.email);
            setPhone(contact.phone);
        }
    }, [contact])


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
            }
        } catch (err) {
            console.error(err);
        }
    }

    const editContact = (id) => {
        console.log("EDIT");
    }


    return (
        <div className="add-contact">
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)} placeholder={name} />
            <label>Last Name</label>
            <input type="text" onChange={e => setLastName(e.target.value)} placeholder={lastName} />
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)} placeholder={email} />
            <label>Phone</label>
            <input type="text" onChange={e => setPhone(e.target.value)} placeholder={phone} />
            <button type="submit" onClick={addContact}>{contact ? "EDIT" : "ADD"}</button>
        </div>
    )
}

export default Form
