import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import HeaderWithLogin from "../components/HeaderWIthLogin";
import "../styles/UpdateUserInfo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormError from "../components/FormError";

function UpdateUserInfo() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const [findEmail, setFindEmail] = useState("");
  const [inputs, setInputs] = useState({});

  // to find user in a db get all info about him if found
  const handleFindUser = async (e) => {
    // setInputs({});
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/updateInfo/getUserInfo",
        { findEmail },
        { withCredentials: true }
      );
      // console.log(res);
      setInputs((prev) => ({
        ...prev,
        ...res.data,
      }));
    } catch (error) {
      setErr(error.response.data);
    }
  };
  console.log(inputs);

  // to check if object `inputs` is empty
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  //label hint
  const hint =
    "Це захешований пароль. Для того, щоб оновити пароль користувача, потрібно стерти старий пароль з поля, та ввести замість нього новий пароль у ЗВИЧАЙНОМУ вигляді";

  // to update info about user
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/updateInfo/updateUserInfo",
        inputs,
        { withCredentials: true }
      );
      // console.log(res);
      setSuccess(res.data);
    } catch (error) {
      // setErr(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="update-info-page">
      <HeaderWithLogin />

      <main className="update-info__main">
        <h2>ОНОВИТИ ДАНІ КОРИСТУВАЧА</h2>
        <section className="find-user__section">
          <h3>Введіть електронну пошту користувача</h3>
          <form action="" className="find-user__form">
            <input
              type="email"
              name="user_email"
              placeholder="Введіть email..."
              onChange={(e) => setFindEmail(e.target.value)}
              value={findEmail}
            />
            <button onClick={handleFindUser}>Знайти</button>
            {err && <FormError err={err} />}
          </form>
        </section>

        {/* show only when user is found */}
        {!isEmptyObject(inputs) && (
          <form action="" className="update-info__form">
            <label htmlFor="user_surname">Прізвище</label>
            <input
              type="text"
              name="user_surname"
              id="user_surname"
              defaultValue={""}
              value={inputs.surname}
              // onChange={handleChange}
              onChange={(e) =>
                setInputs({ ...inputs, surname: e.target.value })
              }
            />
            <label htmlFor="user_name">Ім'я</label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              defaultValue=""
              value={inputs.name}
              // onChange={handleChange}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <label htmlFor="user_fathers_name">По-батькові</label>
            <input
              type="text"
              name="user_fathers_name"
              id="user_fathers_name"
              defaultValue=""
              value={inputs.fathers_name}
              // onChange={handleChange}
              onChange={(e) =>
                setInputs({ ...inputs, fathers_name: e.target.value })
              }
            />
            <label htmlFor="user_email">Електронна пошта</label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              defaultValue=""
              value={inputs.email}
              // onChange={handleChange}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <label htmlFor="user_password">
              Пароль (захешований){" "}
              <span
                style={{
                  textDecoration: "underline",
                  float: "right",
                  cursor: "pointer",
                }}
                title={hint}
              >
                Підказка
              </span>
            </label>
            <input
              type="text"
              name="user_password"
              id="user_password"
              defaultValue=""
              value={inputs.password}
              // onChange={handleChange}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <p>
              Тип користувача: <strong>{inputs.type}</strong>
            </p>
            {/* if user is a student */}
            {inputs.type === "Студент" && (
              <>
                <div className="user__specialty__div">
                  <label htmlFor="user_specialty">Спеціальність</label>
                  <select
                    name="user_specialty"
                    id="user_specialty"
                    // onChange={handleChange}
                    defaultValue={121}
                    value={inputs.specialty_id}
                    onChange={(e) =>
                      setInputs({ ...inputs, specialty_id: e.target.value })
                    }
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
                    // onChange={handleChange}
                    defaultValue={"ФЕІ"}
                    value={inputs.potik}
                    onChange={(e) =>
                      setInputs({ ...inputs, potik: e.target.value })
                    }
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
                    // onChange={handleChange}
                    defaultValue={1}
                    value={inputs.course_number}
                    onChange={(e) =>
                      setInputs({ ...inputs, course_number: e.target.value })
                    }
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
                    // onChange={handleChange}
                    defaultValue={1}
                    value={inputs.group_number}
                    onChange={(e) =>
                      setInputs({ ...inputs, group_number: e.target.value })
                    }
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
            {/* if user is a teacher */}
            {(inputs.type === "Викладач" ||
              inputs.type === "Завідувач кафедри") && (
              <>
                <div className="user__cathedra__div">
                  <label htmlFor="user_cathedra">
                    Оберіть кафедру викладача:
                  </label>
                  <select
                    name="user_cathedra"
                    id="user_cathedra"
                    value={inputs.cathedra_id}
                    defaultValue={1}
                    // onChange={handleChange}
                    onChange={(e) =>
                      setInputs({ ...inputs, cathedra_id: e.target.value })
                    }
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
            <button onClick={handleUpdateInfo}>ОНОВИТИ ДАНІ</button>
            {/* {err && <FormError err={err} />} */}
            {success && (
              <p style={{ color: "green", textAlign: "center" }}>{success}</p>
            )}
          </form>
        )}
      </main>
    </div>
  );
}

export default UpdateUserInfo;
