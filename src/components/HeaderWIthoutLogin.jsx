import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

function HeaderWithoutLogin() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h1>CM</h1>
          <span>Educational platform</span>
        </Link>
      </div>
      <div className="header__link">
        <a href="/about-project">Про проєкт</a>
      </div>
    </header>
  );
}

export default HeaderWithoutLogin;
