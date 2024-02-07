import React, { useState, useEffect, useContext } from "react";
import HeaderWithLogin from "../components/HeaderWithLogin";
import "../styles/RegisterSubject.css";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterSubject() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newSubject, setNewSubject] = useState({
    subject_name: "",
    subject_description: "",
    subject_specialty: 121,
    subject__course: 1,
  });

  const handleChange = (e) => {
    setNewSubject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/subject/addSubject",
        newSubject,
        { withCredentials: true }
      );
      console.log(res.data);
      navigate(`/profile/${currentUser.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-subject">
      <HeaderWithLogin />

      <main className="register__subject__main">
        <h2>СТВОРЕННЯ НОВОГО КУРСУ НА ПЛАТФОРМІ</h2>
        <form className="register__subject__form">
          <input
            type="text"
            name="subject_name"
            placeholder="Введіть назву курсу..."
            onChange={handleChange}
          />
          <textarea
            name="subject_description"
            id="subject_description"
            cols="30"
            rows="10"
            placeholder="Введіть опис курсу..."
            onChange={handleChange}
          ></textarea>
          <span>Спеціальність, на якій викладається курс:</span>
          <div className="subject__specialty__div">
            <select
              name="subject_specialty"
              id="subject_specialty"
              onChange={handleChange}
            >
              <option value={121}>
                121 - Інженерія програмного забезпечення
              </option>
              <option value={122}>122 - Комп'ютерні науки</option>
              <option value={126}>
                126 - Інформаційні системи і технології
              </option>
              <option value={171}>
                171 - Електроніка та комп’ютерні системи
              </option>
              <option value={176}>
                176 - Сенсорні і діагностичні електронні системи
              </option>
            </select>
          </div>
          <div className="subject__course__div">
            <label htmlFor="subject__course">Для якого курсу читається:</label>
            <select
              name="subject__course"
              id="subject__course"
              onChange={handleChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5(1м)</option>
              <option value={6}>6(2м)</option>
            </select>
          </div>
          <input
            type="text"
            readOnly
            value={`${currentUser.surname} ${currentUser.name}`}
          />
          <button onClick={handleAddSubject}>ДОДАТИ КУРС</button>
        </form>
      </main>
    </div>
  );
}

export default RegisterSubject;
