import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./HeadDriver.css";
import useStore from "../../../app/store";

const HeadDriver = () => {
    const logout = useStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate("/"); 
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src="koi-login.png" alt="Logo" className="logo-image" />
                <h1 className="logo">Koi Ordering</h1>
            </div>
            <nav className="navigation">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/driverInfo">
                            <img className="user-avatar profile-icon" src="shipment.png" alt="Profile" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeadDriver;