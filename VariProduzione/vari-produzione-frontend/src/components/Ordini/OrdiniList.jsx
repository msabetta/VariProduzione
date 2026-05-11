import React from "react";
import "./Ordini.css";

const OrdiniList = () => {
    return (
        <div className="ordini-list">
            <div className="ordini-list-content">
                <div className="ordini-list-actions">
                    <button className="btn-primary">Nuovo Ordine</button>
                    <button className="btn-secondary">Importa</button>
                </div>
                <div className="ordini-list-card">
                    <div className="ordini-list-card-content">
                        <div className="ordini-list-card-actions">
                            <button className="btn-primary">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdiniList;