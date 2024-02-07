import React, { useContext } from "react";
import "../styles/Header.css";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";

function HeaderWithLogin() {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__logo__login">
        <Link to="/courses" style={{ textDecoration: "none" }}>
          <h1>CM</h1>
          <span>Educational platform</span>
        </Link>
      </div>
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li className="header__nav__item">
            <a href="/courses">Курси</a>
          </li>
          <li className="header__nav__item">
            <a href={`/profile/${currentUser.id}`}>Профіль</a>{" "}
            {/* dodaty id na posylannia */}
          </li>
          <li className="header__nav__item">
            <span onClick={handleLogout}>Вийти</span>
          </li>
        </ul>
      </nav>
      <div className="header__name__login">
        <span>{`${currentUser.surname} ${currentUser.name}`}</span>
        <br />
        <span>{currentUser.type}</span>
      </div>
    </header>
  );
}

export default HeaderWithLogin;
