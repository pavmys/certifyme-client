import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import "../styles/Profile.css";
import axios from "axios";

function DekanOrZavKafedryProfile(props) {
  const type = props.type;

  const [applies, setApplies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/applies/getApplies",
          {},
          { withCredentials: true }
        );
        setApplies(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(applies);

  const convertTime = (time) => {
    // Create a Date object from the string
    const dateObject = new Date(time);

    // Format the date as a string in a desired format
    const formattedTime = dateObject.toLocaleString(); // Adjust the format as needed
    return formattedTime;
  };

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
                <td>Спеціальність</td>
                <td>Предмет</td>
                <td>Кафедра</td>
                <td>Сертифікат</td>
                <td>Дата подання заявки</td>
                <td>Статус заявки</td>
                <td>Сертифікат</td>
              </tr>
            </thead>
            <tbody>
              {applies.map((apply) => (
                <tr key={apply.id}>
                  <td>{apply.id}</td>
                  <td>{apply.surname}</td>
                  <td>{apply.name}</td>
                  <td>{apply.potik}</td>
                  <td>
                    {apply.course_number}
                    {apply.group_number}
                  </td>
                  <td>{apply.specialty_name}</td>
                  <td>{apply.course_name}</td>
                  <td>{apply.cathedra_name}</td>
                  <td>
                    {apply.type} {apply.year}
                  </td>
                  <td>{convertTime(apply.applied_at)}</td>
                  {apply.status === "На розгляді" && (
                    <>
                      <td style={{ backgroundColor: "gray" }}>
                        {apply.status}
                      </td>
                    </>
                  )}
                  {apply.status === "Підтверджено" && (
                    <>
                      <td style={{ backgroundColor: "#00ad1c" }}>
                        {apply.status}
                      </td>
                    </>
                  )}
                  <td>
                    <a
                      target="_blank"
                      href={apply.path}
                      style={{ color: "white" }}
                    >
                      Сертифікат
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}

export default DekanOrZavKafedryProfile;
