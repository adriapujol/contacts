import React, { useState, useEffect } from 'react';
import './App.scss';
import ContactsList from './components/ContactsList';
import Header from './components/Header';
import Form from './components/Form';
import Loading from './components/Loading';
import Message from './components/Message';
import { url } from './DatabaseURL';


function App() {
  const [contacts, setContacts] = useState([]);
  const [edit, setEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchField, setSearchField] = useState('');


  useEffect(() => {

    const fetchData = async () => {
      try {
        let response = await fetch(`${url}/contacts`);
        let contacts = await response.json();
        setContacts(contacts);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMessage("There was an error. Try again later.")
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
      {
        showForm && (Object.keys(edit).length !== 0 ?
          <Form setContacts={setContacts} contact={edit} setShowForm={setShowForm} setEdit={setEdit} />
          :
          <Form setContacts={setContacts} setShowForm={setShowForm} />)
      }
      <div className="contacts-box">
        {loading ? <Loading />
          :
          contacts.length === 0 ?
            <div className="no-contacts">There are no contacts yet</div>
            :
            <ContactsList contactsList={filteredList} setContacts={setContacts} setEdit={setEdit} setShowForm={setShowForm} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />

        }
        {errorMessage && <Message message={errorMessage} type="error" />}
        {successMessage && <Message message={successMessage} type="success" />}
      </div>
    </div>
  );
}

export default App;
