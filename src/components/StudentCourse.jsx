import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function StudentCourse() {
  const { currentUser } = useContext(AuthContext);
  const [certificates, setCertificates] = useState([]);
  const [chosenCertificate, setChosenCertificate] = useState(null);
  const [applies, setApplies] = useState([]);

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const subjectId = location.pathname.split("/")[2];

  //get user's certificates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/certificates/getUserCertificates",
          { withCredentials: true }
        );
        setCertificates(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const convertTime = (time) => {
    // Create a Date object from the string
    const dateObject = new Date(time);

    // Format the date as a string in a desired format
    const formattedTime = dateObject.toLocaleString(); // Adjust the format as needed
    return formattedTime;
  };

  const handleSelectCertificate = (certificate) => {
    setChosenCertificate({
      course_id: Number(subjectId),
      ...certificate,
    });
  };

  // upload user's apply (teacher will submit it)
  const uploadApply = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/applies/uploadApply",
        chosenCertificate,
        {
          withCredentials: true,
        }
      );
      setSuccess(res.data.message);
      setErr(null);
      navigate(`/courses/${subjectId}`);
    } catch (error) {
      setErr(error.response.data.error);
      setSuccess(null);
    }
  };

  // get all user's applies
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

  // student generates application
  const generateApplication = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/applies/generateApplication",
        applies[0],
        { withCredentials: true }
      );

      const typedArray = new Uint8Array(Object.values(res.data));
      const blob = new Blob([typedArray], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Заява_${applies[0].id}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {applies && (
        <section className="applied__certificate">
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
              {applies.map((apply) => (
                <tr key={apply.id}>
                  <td>{apply.id}</td>
                  <td>{apply.type}</td>
                  <td>{apply.year}</td>
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
                      <td>
                        <button onClick={generateApplication}>
                          Згенерувати заяву
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {chosenCertificate && (
        <section className="chosen__certificate">
          <h3>ОБРАНИЙ СЕРТИФІКАТ</h3>
          <form className="chosen__certificate__form">
            <input type="text" value={chosenCertificate.id} readOnly />
            <input type="text" value={chosenCertificate.type} readOnly />
            <input type="text" value={chosenCertificate.year} readOnly />
            <button
              className="chosen__certificate__cancel"
              onClick={() => setChosenCertificate(null)}
            >
              Скасувати
            </button>
            <button
              className="chosen__certificate__submit"
              onClick={uploadApply}
            >
              Надіслати
            </button>
          </form>
          {err && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {err}
            </p>
          )}
          {success && (
            <p
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              {success}
            </p>
          )}
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
            {certificates.map((certificate) => {
              if (certificate.active === 1) {
                return (
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
                );
              }
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default StudentCourse;
