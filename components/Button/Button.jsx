import React from 'react';
import '../SubmitButton/SubmitButton.scss';

export default ({onClick, children }) => (
    <button onClick={onClick} className="site-submit-btn">{children}</button>
)