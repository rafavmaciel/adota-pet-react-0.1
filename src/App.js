import React from "react";
import Navbar from "./components/Navbar";
import { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import MinhaConta from "./pages/MinhaConta";


import "./App.css";
import SearchPage from "./pages/SearchPage";
import LoginModal from "./components/LoginModal";
import { UserProvider } from "./redux/UserReducer";
function App() {

    return (
        <UserProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<LoginModal />} />
                <Route path="/pets" element={<Home />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/search-pet/:tipo" element={<SearchPage/>} />
                <Route path="/conta" element={<MinhaConta />} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
