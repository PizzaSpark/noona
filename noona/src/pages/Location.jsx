import React from "react";
import NavBar from "../components/NavBar";

export default function Location() {
    return (
        <div className="content">
            <NavBar />

            <div className="content">
                <h1>LOCATION</h1>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.20412159615!2d121.17549138449634!3d16.51578948720975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339041a3d8eef57b%3A0xaf4963f6230d8918!2shi%20Noona%20cafe!5e0!3m2!1sen!2sph!4v1716395145348!5m2!1sen!2sph"
                    width="600"
                    height="450"
                    style={{border:0}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}
