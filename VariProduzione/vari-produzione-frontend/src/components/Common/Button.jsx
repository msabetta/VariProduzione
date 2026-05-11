import React from "react";

const Badge = ({ children, color }) => {
    return (
        <span
            style={{
                backgroundColor: color,
            }}
        >
            {children}
        </span>
    );
};

export default Button;