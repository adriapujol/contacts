import React from 'react';
import './Header.scss';

const Header = ({ setSearchField, setShowForm }) => {
    return (
        <div className="header">
            <input type="text" className="searchField" onChange={(e) => setSearchField(e.target.value)} placeholder="Search contact..." />
            <button className="add-button" onClick={() => setShowForm(true)}>Add Contact</button>
        </div>
    )
}

export default Header
