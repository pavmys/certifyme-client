import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Course.css";

function TeacherCourse() {
  const { currentUser } = useContext(AuthContext);

  const [applies, setApplies] = useState([]);
  const [chosenApply, setChosenApply] = useState(null);

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const subjectId = location.pathname.split("/")[2];

  const convertTime = (time) => {
    // Create a Date object from the string
    const dateObject = new Date(time);

    // Format the date as a string in a desired format
    const formattedTime = dateObject.toLocaleString(); // Adjust the format as needed
    return formattedTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/applies/getApplies",
          { subjectId },
          { withCredentials: true }
        );
        setApplies(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chosenApply) {
      try {
        const res = axios.post(
          "http://localhost:8000/api/applies/submitApply",
          chosenApply,
          { withCredentials: true }
        );
        setSuccess("Заявку підтверджено");
      } catch (error) {
        console.log(error);
      }
    }
  }, [chosenApply]);

  const handleConfirmApply = (apply) => {
    setChosenApply(apply);
  };

  return (
    <>
      <h3>ПОДАНІ ЗАЯВКИ НА ЦЕЙ КУРС</h3>
      {success && (
        <p
          style={{
            color: "green",
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "18px",
          }}
        >
          {success}
        </p>
      )}
      {applies && (
        <table className="view-course-applies">
          <thead>
            <tr>
              <td>ID заявки</td>
              <td>Прізвище</td>
              <td>Ім'я</td>
              <td>Потік</td>
              <td>Група</td>
              <td>Сертифікат</td>
              <td>Дата подання заявки</td>
              <td>Сертифікат</td>
              <td>Статус заявки</td>
              <td></td>
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
                <td>
                  {apply.type} {apply.year}
                </td>
                <td>{convertTime(apply.applied_at)}</td>
                <td>
                  <a style={{ color: "white" }} href={apply.path}>
                    Сертифікат
                  </a>
                </td>
                {apply.status === "На розгляді" && (
                  <>
                    <td style={{ backgroundColor: "gray" }}>{apply.status}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "white",
                          border: "none",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleConfirmApply(apply)}
                      >
                        Підтвердити заявку
                      </button>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default TeacherCourse;
