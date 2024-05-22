import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import ManageMenu from "./pages/ManageMenu";
import ManageAdmins from "./pages/ManageAdmins";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Location from "./pages/Location";
import Socials from "./pages/Socials";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/location" element={<Location />} />
                <Route path="/socials" element={<Socials />} />
                <Route path="/about" element={<About />} />

                <Route path="/login" element={<Login />} />
                <Route path="/managemenu" element={<ManageMenu />} />
                <Route path="/manageadmins" element={<ManageAdmins />} />

                <Route path="*" element={<NotFound />} />
                <Route path="/forbidden" element={<Forbidden />} />
            </Routes>
        </BrowserRouter>
    );
}
