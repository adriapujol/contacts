import React from 'react'
import Contact from './Contact';
import './ContactsList.scss';

const ContactsList = ({ contactsList, setContacts, setEdit, setShowForm, setSuccessMessage, setErrorMessage }) => {
    return (
        <div className="contacts-list">
            {contactsList.map((contact, index) => {
                return <Contact key={index} contact={contact} setContacts={setContacts} setEdit={setEdit} setShowForm={setShowForm} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
            })}
        </div>
    )
}

export default ContactsList
