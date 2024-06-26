import React from "react";
import forbiddenImage from "../assets/404 NotFound.png";

export default function NotFound() {
    return (
        <div className="error-page">
            <img src={forbiddenImage} alt="Forbidden access" />
            <a href="/">Go back to Home</a>
        </div>
    );
}
