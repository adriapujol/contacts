import React, { useState } from 'react';
import './Form.scss';

const Form = ({ setContacts }) => {

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
                    return [json, ...prevContacts]
                })
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="add-contact">
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)} />
            <label>Last Name</label>
            <input type="text" onChange={e => setLastName(e.target.value)} />
            <label>Email</label>
            <input type="text" onChange={e => setEmail(e.target.value)} />
            <label>Phone</label>
            <input type="text" onChange={e => setPhone(e.target.value)} />
            <button type="submit" onClick={addContact}>ADD</button>
        </div>
    )
}

export default Form
