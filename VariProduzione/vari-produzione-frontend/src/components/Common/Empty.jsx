import React from "react";

const Empty = ({ children, color }) => {
    return (
        <div
            style={{
                backgroundColor: color,
            }}
        >
            {children}
        </div>
    );
};

export default Empty;