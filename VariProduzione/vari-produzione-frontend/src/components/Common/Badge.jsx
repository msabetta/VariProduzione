import React from 'react';

const Badge = ({ children, color, size }) => {
    return (
        <span className={`badge badge-${color} badge-${size}`}>
            {children}
        </span>
    );
};

export default Badge;

