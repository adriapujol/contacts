import React, { useState, useEffect } from 'react';
import "./App.scss";
import Contact from './components/Contact';
import Form from './components/Form';


function App() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);


  useEffect(() => {

    // HANDE TRY CATCK FETCHING DATA
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:3001/read');
        console.log(response);
        let contacts = await response.json();
        console.log(contacts.sort());
        setContacts(contacts);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
    console.log('Mounted');
  }, [])

  return (
    <div className="App">
      <Form setContacts={setContacts} />
      <div>
        <h2>Contacts</h2>
        {contacts.map((contact, index) => {
          let { _id, name, lastName, email, phone } = contact;
          return <Contact key={index} id={_id} name={name} lastName={lastName} email={email} phone={phone} setContacts={setContacts} />
        })}
      </div>
    </div>
  );
}

export default App;
