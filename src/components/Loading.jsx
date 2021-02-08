import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading">
            <div className="content-wrapper">
                <div className="text">Loading</div>
                <div className="spinner"></div>
            </div>
        </div>
    )
}

export default Loading
