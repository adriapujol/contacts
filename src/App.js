import React, { useState, useEffect } from 'react';
import "./App.scss";
import Contact from './components/Contact';
import Form from './components/Form';


function App() {
  const [contacts, setContacts] = useState([]);
  const [edit, setEdit] = useState({});
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {

    // HANDE TRY CATCK FETCHING DATA
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:3001/read');
        let contacts = await response.json();
        setContacts(contacts);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="App">

      {showForm && (Object.keys(edit).length !== 0 ? <Form setContacts={setContacts} contact={edit} setShowForm={setShowForm} setEdit={setEdit} /> : <Form setContacts={setContacts} setShowForm={setShowForm} />)}
      <div>
        <input type="text" />
        <button className="add-button" onClick={() => setShowForm(true)}>Add Contact</button>
        <h2>Contacts</h2>
        {contacts.map((contact, index) => {
          return <Contact key={index} contact={contact} setContacts={setContacts} setEdit={setEdit} setShowForm={setShowForm} />
        })}
      </div>
    </div>
  );
}

export default App;
