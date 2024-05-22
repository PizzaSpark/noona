import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import ManageMenu from "./pages/ManageMenu";
import ManageAdmins from "./pages/ManageAdmins";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Landing />} /> */}
                <Route path="/" element={<ManageMenu />} />
                <Route path="/managemenu" element={<ManageMenu />} />
                <Route path="/manageadmins" element={<ManageAdmins />} />

                <Route path="*" element={<NotFound />} />
                <Route path="/forbidden" element={<Forbidden />} />
            </Routes>
        </BrowserRouter>
    );
}
