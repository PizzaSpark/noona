import React from "react";
import "../styles/NavBar.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Noona Logo" />
                <h1>Hi Noona Cafe</h1>
            </div>

            <div className="navbar-links">
                <NavbarLink to="/" label="Home" />
                <NavbarLink to="/menu" label="Menu" />
                <NavbarLink to="/location" label="Location" />
                <NavbarLink to="/socials" label="Socials" />
                <NavbarLink to="/about" label="About" />
            </div>

            <div className="navbar-signin">
                <a href="/login">Login</a>
            </div>
        </div>
    );
}


function NavbarLink({ to, label }) {
    return (
        <NavLink to={to}>
            <p>{label}</p>
        </NavLink>
    );
}
