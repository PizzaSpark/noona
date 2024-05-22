import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="*" element={<NotFound />} />
                <Route path="/forbidden" element={<Forbidden />} />
            </Routes>
        </BrowserRouter>
    );
}
