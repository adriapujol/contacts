import React, { useState, useEffect } from 'react';
import "./App.scss";
import Contact from './components/Contact';

function App() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('http://localhost:3001/read');
      let contacts = await response.json();
      setContacts(contacts);
    }
    fetchData();
    console.log('Mounted');
  }, [])

  const addContact = async () => {
    console.log("Hello");
    if (name === '' || lastName === '' || email === '' || phone === '') {
      console.log("All fields required");
      return alert("Wrong");
    }
    const data = { name: name, lastName: lastName, email: email, phone: phone };
    fetch('http://localhost:3001/new', {
      method: 'POST',
      headers: {
        "Accpet": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setContacts(prevContacts => {
          return [json, ...prevContacts]
        })
      })
      .catch(() => console.error('Error9'));
  }

  // const getContacts = async () => {
  //   let response = await fetch('http://localhost:3001/read');
  //   let contacts = await response.json();

  //   return contacts;
  // }




  return (
    <div className="App">
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
      <div>
        <h2>Contacts</h2>
        {contacts.map((contact, index) => {
          let { id, name, lastName, email, phone } = contact;
          return <Contact key={index} name={name} lastName={lastName} email={email} phone={phone} />
        })}
      </div>
    </div>
  );
}

export default App;
