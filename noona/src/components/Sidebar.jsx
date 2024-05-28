import React from "react";
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { BarChart, Logout, MenuBook, People } from "@mui/icons-material";

export default function Sidebar() {
    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
    };

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <h1>Noona</h1>
                <div className="sidebar-items">

                    <SidebarLink
                        to="/managemenu"
                        Icon={MenuBook}
                        label="Manage Menu"
                    />

                    <SidebarLink
                        to="/manageadmins"
                        Icon={People}
                        label="Manage Admins"
                    />

                    <SidebarLink
                        to="/"
                        Icon={Logout}
                        label="Logout"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ to, label, Icon, onClick }) {
    return (
        <NavLink to={to} onClick={onClick}>
            <div className="tilecontent">
                <Icon />
                <p>{label}</p>
            </div>
        </NavLink>
    );
}
