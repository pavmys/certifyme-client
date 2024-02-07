import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import "../styles/Profile.css";

function DekanOrZavKafedryProfile(props) {
  const type = props.type;

  return (
    <main className="profile__main">
      <section className="profile info">
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
            <span>{props.type}</span>
          </div>
        </section>

        <section className="profile__applies">
          {type === "Завідувач кафедри" && (
            <h2>ПЕРЕГЛЯД УСІХ ЗАЯВОК ПО ВАШІЙ КАФЕДРІ</h2>
          )}
          {type === "Деканат" && <h2>ПЕРЕГЛЯД УСІХ ЗАЯВОК</h2>}

          <table className="view-cathedra-applies">
            <thead>
              <tr>
                <td>ID заявки</td>
                <td>Прізвище</td>
                <td>Ім'я</td>
                <td>Потік</td>
                <td>Група</td>
                <td>Курс</td>
                <td>Спеціальність</td>
                <td>Викладач</td>
                <td>Сертифікат</td>
                <td>Дата подання заявки</td>
                <td>Статус заявки</td>
                <td>Сертифікат</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>14</td>
                <td>Миськів</td>
                <td>Павло</td>
                <td>ФЕІ</td>
                <td>52</td>
                <td>Прикладна теорія інформації</td>
                <td>Комп'ютерні науки</td>
                <td>Болеста І.М.</td>
                <td>DES 2023</td>
                <td>1/26/2024, 14:28:35 PM</td>
                <td>На розгляді</td>
                <td>Сертифікат</td>
              </tr>
              <tr>
                <td>15</td>
                <td>Заставський</td>
                <td>Святослав</td>
                <td>ФЕІ</td>
                <td>53</td>
                <td>Системи штучного інтелекту</td>
                <td>Комп'ютерні науки</td>
                <td>Грабовський В.А.</td>
                <td>DES 2022</td>
                <td>1/26/2024, 14:28:35 PM</td>
                <td>Підтверджено</td>
                <td>Сертифікат</td>
              </tr>
              <tr>
                <td>16</td>
                <td>Миськів</td>
                <td>Павло</td>
                <td>ФЕІ</td>
                <td>52</td>
                <td>Хмарні обчислення</td>
                <td>Комп'ютерні науки</td>
                <td>Огірко І.В.</td>
                <td>DES 2023</td>
                <td>1/26/2024, 14:28:35 PM</td>
                <td>На розгляді</td>
                <td>Сертифікат</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}

export default DekanOrZavKafedryProfile;
