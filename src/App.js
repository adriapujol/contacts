import React, { useState, useEffect } from 'react';
import "./App.scss";
import ContactsList from './components/ContactsList';
import Header from './components/Header';
import Form from './components/Form';
import Loading from './components/Loading';


function App() {
  const [contacts, setContacts] = useState([]);
  const [edit, setEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchField, setSearchField] = useState('');


  useEffect(() => {

    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:3001/contacts/');
        let contacts = await response.json();
        setLoading(false);
        setContacts(contacts);
      } catch (err) {
        setLoading(false);
        setErrorMessage("Couldn't fetch the contacts.")
        console.error(err);
      }
    }
    fetchData();
  }, [])

  const filteredList = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(searchField.toLowerCase()) || contact.lastName.toLowerCase().includes(searchField.toLowerCase());
  })

  return (
    <div className="App">
      <Header setSearchField={setSearchField} setShowForm={setShowForm} />
      {showForm && (Object.keys(edit).length !== 0 ? <Form setContacts={setContacts} contact={edit} setShowForm={setShowForm} setEdit={setEdit} /> : <Form setContacts={setContacts} setShowForm={setShowForm} />)}
      <div className="contacts-box">
        {/* <Loading></Loading> */}
        {loading && <Loading />}
        {errorMessage}
        <ContactsList contactsList={filteredList} setContacts={setContacts} setEdit={setEdit} setShowForm={setShowForm} />
      </div>
    </div>
  );
}

export default App;
