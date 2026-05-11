import React from "react";

const Modal = ({ children, color }) => {
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

export default Modal;