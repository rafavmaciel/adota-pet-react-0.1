import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";

import "./App.css";
import SearchPage from "./pages/SearchPage";
import LoginModal from "./components/LoginModal";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<LoginModal />} />
                <Route path="/pets" element={<Home />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/search-pet/:tipo" element={<SearchPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
