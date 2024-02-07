import React, { useContext, useEffect, useState } from "react";
import "../styles/Course.css";
import HeaderWithLogin from "../components/HeaderWithLogin";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StudentCourse from "../components/StudentCourse";
import TeacherCourse from "../components/TeacherCourse";

function Course() {
  const { currentUser } = useContext(AuthContext);
  const [subject, setSubject] = useState({});

  const location = useLocation();

  const subjectId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/subject/getSubjects/${subjectId}`
        );
        setSubject(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subjectId]);

  const handleDeleteSubject = async () => {};

  return (
    <div className="course-page">
      <HeaderWithLogin />

      <main className="course__main">
        <section className="course__info">
          <h2>{subject.course_name}</h2>
          <p>{subject.course_description}</p>
        </section>

        {currentUser.type === "Студент" && <StudentCourse />}

        {currentUser.type === "Викладач" && <TeacherCourse />}

        {/* <section className="applied__certificate">
          <h3>ПОДАНІ ЗАЯВКИ</h3>
          <table className="applied__certificate__table">
            <thead>
              <tr>
                <td>№</td>
                <td>Назва</td>
                <td>Рік</td>
                <td>Коли подано заявку</td>
                <td>Статус заявки</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {appliedCertificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td>{certificate.id}</td>
                  <td>{certificate.certifName}</td>
                  <td>{certificate.certifYear}</td>
                  <td style={{ fontSize: "13px" }}>{certificate.certifTime}</td>
                  {certificate.certifStatus === "На розгляді" && (
                    <>
                      <td style={{ backgroundColor: "gray" }}>
                        {certificate.certifStatus}
                      </td>
                    </>
                  )}
                  {certificate.certifStatus === "Підтверджено" && (
                    <>
                      <td style={{ backgroundColor: "#00ad1c" }}>
                        {certificate.certifStatus}
                      </td>
                      <td>
                        <button>Згенерувати заяву</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {chosenCertificate && (
          <section className="chosen__certificate">
            <h3>ОБРАНИЙ СЕРТИФІКАТ</h3>
            <form className="chosen__certificate__form">
              <input type="text" value={chosenCertificate.id} readOnly />
              <input type="text" value={chosenCertificate.type} readOnly />
              <input type="text" value={chosenCertificate.year} readOnly />
              <input
                type="text"
                value={`${currentUser.surname[0]}.${currentUser.name[0]}.`}
                readOnly
              />
              <button
                className="chosen__certificate__cancel"
                onClick={() => setChosenCertificate(null)}
              >
                Скасувати
              </button>
              <button className="chosen__certificate__submit">Надіслати</button>
            </form>
          </section>
        )}

        <section className="available__certificates">
          <h3>ДОСТУПНІ СЕРТИФІКАТИ</h3>
          <table className="available__certificates__table">
            <thead>
              <tr>
                <td>№</td>
                <td>Назва</td>
                <td>Рік</td>
                <td>Коли завантажено</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td>{certificate.id}</td>
                  <td>{certificate.type}</td>
                  <td>{certificate.year}</td>
                  <td>{convertTime(certificate.updated_at)}</td>
                  <td>
                    <button
                      onClick={() => handleSelectCertificate(certificate)}
                    >
                      Обрати
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section> */}

        {/* {currentUser.type === "Викладач" &&
          subject.teacher_id === currentUser.id && (
            <button>Видалити курс</button>
          )} */}
      </main>
    </div>
  );
}

export default Course;
