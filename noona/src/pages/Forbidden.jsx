import React from "react";
import notFoundImage from "../assets/404 NotFound.png";

export default function Forbidden() {
    return (
        <div className="error-page">
            <img src={notFoundImage} alt="Not Found" />
            <a href="/">Go back to Home</a>
        </div>
    );
}
