import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PetsList from "./pages/PetsList";
import ContactUs from "./pages/ContactUs";

import "./App.css";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pets" element={<PetsList />} />
                <Route path="/contact" element={<ContactUs />} />
            </Routes>
        </Router>
    );
}

export default App;
