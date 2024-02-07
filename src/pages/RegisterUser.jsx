import React, { useContext, useState } from "react";
import "../styles/RegisterUser.css";
import HeaderWithLogin from "../components/HeaderWIthLogin";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";

function RegisterUser() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const [inputs, setInputs] = useState({
    user_surname: "",
    user_name: "",
    user_fathers_name: "",
    user_type: "Студент",
    user_email: "",
    user_password: "",
    user_specialty: 121,
    user_potik: "ФЕІ",
    user_course_number: 1,
    user_group_number: 1,
    user_cathedra: null,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const studentChoose = () => {
    setInputs((prev) => ({
      ...prev,
      user_cathedra: null,
    }));
  };

  const teacherChoose = () => {
    setInputs((prev) => ({
      ...prev,
      user_cathedra: 1,
      user_course_number: null,
      user_group_number: null,
      user_potik: "",
      user_specialty: null,
    }));
  };
  const adminAndDekanatChoose = () => {
    setInputs((prev) => ({
      ...prev,
      user_course_number: null,
      user_group_number: null,
      user_potik: "",
      user_specialty: null,
      user_cathedra: null,
    }));
  };

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/registerAnyUser",
        inputs,
        { withCredentials: true }
      );
      navigate(`/profile/${currentUser.id}`);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="register-user-page">
      <HeaderWithLogin />

      {currentUser.type === "Адміністратор" ? (
        <main className="register-user__main">
          <h2>ДОДАТИ НОВОГО КОРИСТУВАЧА</h2>
          <form className="register-user__form">
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
            <div className="user__type__div">
              <label htmlFor="user_type">Оберіть тип користувача</label>
              <br />
              <select
                name="user_type"
                value={inputs.user_type}
                onChange={(e) => {
                  setInputs((prev) => ({ ...prev, user_type: e.target.value }));
                  switch (e.target.value) {
                    case "Студент": {
                      studentChoose();
                      break;
                    }
                    case "Викладач": {
                      teacherChoose();
                      break;
                    }
                    case "Завідувач кафедри": {
                      teacherChoose();
                      break;
                    }
                    case "Деканат": {
                      adminAndDekanatChoose();
                      break;
                    }
                    case "Адміністратор": {
                      adminAndDekanatChoose();
                      break;
                    }
                  }
                }}
              >
                <option value="Студент">Студент</option>
                <option value="Викладач">Викладач</option>
                <option value="Завідувач кафедри">Завідувач кафедри</option>
                <option value="Деканат">Деканат</option>
                <option value="Адміністратор">Адміністратор</option>
              </select>
            </div>
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
                type="text"
                placeholder="Пароль"
                onChange={handleChange}
              />
              {/* <img
              width="43"
              height="43"
              src="https://img.icons8.com/color/48/shuffle.png"
              alt="shuffle"
              onClick={generateRandomPassword}
              title="Згенерувати пароль"
            /> */}
            </div>
            {inputs.user_type === "Студент" && (
              <>
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
              </>
            )}
            {(inputs.user_type === "Викладач" ||
              inputs.user_type === "Завідувач кафедри") && (
              <>
                <div className="user__cathedra__div">
                  <label htmlFor="user_cathedra">
                    Оберіть кафедру викладача:
                  </label>
                  <select
                    name="user_cathedra"
                    id="user_cathedra"
                    onChange={handleChange}
                  >
                    <option value={1}>Кафедра системного проектування</option>
                    <option value={2}>
                      Кафедра оптоелектроніки та інформаційних технологій
                    </option>
                    <option value={3}>
                      Кафедра радіоелектронних і комп'ютерних систем
                    </option>
                    <option value={4}>
                      Кафедра радіофізики та комп'ютерних технологій
                    </option>
                    <option value={5}>
                      Кафедра сенсорної та напівпровідникової електроніки
                    </option>
                    <option value={6}>
                      Кафедра фізичної та біомедичної електроніки
                    </option>
                  </select>
                </div>
              </>
            )}
            <button onClick={handleAddNewUser}>ДОДАТИ КОРИСТУВАЧА</button>
            {err && <FormError err={err} />}
          </form>
        </main>
      ) : (
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            marginTop: "60px",
          }}
        >
          Ви не маєте доступу до цієї сторінки
        </h1>
      )}
    </div>
  );
}

export default RegisterUser;
