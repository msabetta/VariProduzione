import React from 'react';

const Card = ({ children, color, size }) => {
    return (
        <div className={`card card-${color} card-${size}`}>
            {children}
        </div>
    );
};

export default Card;