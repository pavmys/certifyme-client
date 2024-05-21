import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import HeaderWithoutLogin from "../components/HeaderWIthoutLogin";

// this is page which are students register from (without logging in)

function Register() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIconSrc, setPasswordIconSrc] = useState(
    "https://img.icons8.com/ios/50/closed-eye.png"
  );

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIconSrc("https://img.icons8.com/ios/50/visible--v1.png");
    } else {
      setPasswordType("password");
      setPasswordIconSrc("https://img.icons8.com/ios/50/closed-eye.png");
    }
  };

  const [inputs, setInputs] = useState({
    user_surname: "",
    user_name: "",
    user_fathers_name: "",
    user_email: "",
    user_password: "",
    user_specialty: 121,
    user_potik: "ФЕІ",
    user_course_number: 1,
    user_group_number: 1,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", inputs);
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="register-page">
      <HeaderWithoutLogin />

      <h1 className="register__h1">РЕЄСТРАЦІЯ</h1>
      <form className="register__form">
        <input
          name="user_surname"
          required
          type="text"
          placeholder="Прізвище"
          onChange={handleChange}
        />
        <input
          name="user_name"
          required
          type="text"
          placeholder="Ім'я"
          onChange={handleChange}
        />
        <input
          name="user_fathers_name"
          required
          type="text"
          placeholder="По-батькові"
          onChange={handleChange}
        />
        <span>
          Вводьте тільки КОРПОРАТИВНУ ПОШТУ, яку Вам видав навчальний заклад
        </span>
        <input
          name="user_email"
          required
          type="email"
          placeholder="Електронна пошта"
          onChange={handleChange}
        />
        <div className="user__password__div">
          <input
            name="user_password"
            required
            type={passwordType}
            placeholder="Пароль"
            onChange={handleChange}
          />
          <img
            width="43"
            height="43"
            src={passwordIconSrc}
            alt="closed-eye"
            onClick={togglePassword}
          />
        </div>
        <div className="user__specialty__div">
          <label htmlFor="user_specialty">Спеціальність</label>
          <select
            name="user_specialty"
            id="user_specialty"
            onChange={handleChange}
          >
            <option value={121}>
              121 - Інженерія програмного забезпечення
            </option>
            <option value={122}>122 - Комп'ютерні науки</option>
            <option value={126}>126 - Інформаційні системи і технології</option>
            <option value={171}>
              171 - Електроніка та комп’ютерні системи
            </option>
            <option value={176}>
              176 - Сенсорні і діагностичні електронні системи
            </option>
          </select>
        </div>
        <div className="user__group__div">
          <label htmlFor="">Група</label>
          <select
            name="user_potik"
            id="user_potik"
            className="user__potik"
            onChange={handleChange}
          >
            <option value="ФЕІ">ФЕІ</option>
            <option value="ФЕМ">ФЕМ</option>
            <option value="ФЕП">ФЕП</option>
            <option value="ФЕС">ФЕС</option>
            <option value="ФЕЛ">ФЕЛ</option>
          </select>
          <select
            name="user_course_number"
            id="user_course_number"
            className="user_course_number"
            onChange={handleChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
          <select
            name="user_group_number"
            id="user_group_number"
            className="user_group_number"
            onChange={handleChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Зареєструватись</button>
        {err && <p>{err}</p>}
        <span>
          Маєте обліковий запис? <a href="/">Увійти</a>
        </span>
      </form>
    </div>
  );
}

export default Register;
