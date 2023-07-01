import React from "react";
import "./appTitle.scss";

export const AppTitle = ({ title }) => {
    return (
        <div className="titlecontainer">
            <div className="appTitle">{title}</div>
        </div>
    );
};
