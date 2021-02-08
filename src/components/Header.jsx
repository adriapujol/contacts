import React from 'react';
import './Header.scss';

const Header = ({ setSearchField, setShowForm }) => {
    return (
        <div className="header">
            <i className="logo fas fa-users"></i>
            <input type="text" className="searchField" onChange={(e) => setSearchField(e.target.value)} placeholder="Search contact..." />
            <button className="add-button" onClick={() => setShowForm(true)}><i className="fas fa-user-plus" /></button>
        </div>
    )
}

export default Header
