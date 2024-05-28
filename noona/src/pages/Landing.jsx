import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../assets/banner.jpg";

export default function Landing() {
    return (
        <div className="page-container">
            <NavBar />

            <div className="content">
                <div className="landing-container">
                    <div className="column">
                        <h1>Seat with us and Chill</h1>

                        <h5>Explore our menu!</h5>
                    </div>

                    <div className="image-container">
                        <img className="banner" src={Banner} alt="banner" />{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}
