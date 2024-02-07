// import React, { useContext } from "react";
// import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

function AdministratorProfile(props) {
  return (
    <main className="profile__main">
      <section className="profile__info">
        <div className="profile__name">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/cotton/100/user-male-circle.png"
            alt="user-male-circle"
          />
          <span>{`${props.surname} ${props.name}`}</span>
        </div>
        <div className="profile__group">
          <span>Адміністратор</span>
        </div>
      </section>

      <section className="profile__action">
        <Link to="/register-new-user">
          <button>Додати нового користувача</button>
        </Link>
        <Link to="/update-user">
          <button>Редагувати дані користувача</button>
        </Link>
        <Link to="/show-all-applies">
          <button>Переглянути заявки</button>
        </Link>
      </section>
    </main>
  );
}

export default AdministratorProfile;
