import React from 'react'
import Contact from './Contact';

const ContactsList = ({ contactsList, setContacts, setEdit, setShowForm }) => {
    return (
        <div className="contacts-list">
            {contactsList.map((contact, index) => {
                return <Contact key={index} contact={contact} setContacts={setContacts} setEdit={setEdit} setShowForm={setShowForm} />
            })}
        </div>
    )
}

export default ContactsList
