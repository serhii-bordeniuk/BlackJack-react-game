import React from "react";
import "./appTitle.scss";

export const AppTitle = ({ title, informationMessage }) => {
    return (
        <div className="titlecontainer">
            <div className="appTitle">{title}</div>
            <div className="infoMessage">{informationMessage}</div>
        </div>
    );
};
