import React from "react";
import "./index.scss";

const AppTitle = ({ title, informationMessage }) => {
    return (
        <div className="titlecontainer">
            <div className="appTitle">{title}</div>
            <div className="infoMessage">{informationMessage}</div>
        </div>
    );
};

export default AppTitle;
