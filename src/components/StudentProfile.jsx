import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import axios from "axios";

function StudentProfile(props) {
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [certificates, setCertificates] = useState([]);

  // uploading certificate
  const handleUploadCertificate = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
          "http://localhost:8000/api/upload-certificate",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 200) {
          setErr(null);
          setSuccess(res.data.message);
        }
        // console.log(res);
      } else {
        setSuccess(null);
        setErr("Файл не вибрано!");
      }
    } catch (error) {
      setSuccess(null);
      setErr(error.response.data.error);
    }
  };

  //get user's certificates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/certificates/getUserCertificates",
          { withCredentials: true }
        );
        // console.log(res);
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
          <span>
            Група <strong>{props.group}</strong>
          </span>
        </div>
      </section>

      <p className="profile__note">
        Увага! Завантажуйте лише ОРИГІНАЛЬНІ сертифікати у форматі PDF, які були
        надіслані модерацією Вам на пошту або були завантажені з офіційної
        платформи курсів.
      </p>

      <form className="upload__certificate__form" encType="multipart/form-data">
        <input
          type="file"
          name="user_certificate"
          className="file-input"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="fileInput" className="file-label">
          Choose File
        </label>
        <button className="upload__button" onClick={handleUploadCertificate}>
          Завантажити
        </button>
        {err && <p style={{ color: "red" }}>{err}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>

      <h2 className="profile__sect__cert__name">МОЇ ЗАВАНТАЖЕНІ СЕРТИФІКАТИ</h2>
      <section className="profile__certificates">
        {certificates.map((certificate) => {
          if (certificate.active === 0) {
            return (
              <div
                className="profile__certificate"
                key={certificate.id}
                style={{ opacity: "0.3" }}
              >
                <iframe src={certificate.path} frameBorder="0"></iframe>
                <h3>
                  {certificate.type} {certificate.year}
                </h3>
                <span>Завантажено: {convertTime(certificate.updated_at)}</span>
              </div>
            );
          } else {
            return (
              <div className="profile__certificate" key={certificate.id}>
                <iframe src={certificate.path} frameBorder="0"></iframe>
                <h3>
                  {certificate.type} {certificate.year}
                </h3>
                <span>Завантажено: {convertTime(certificate.updated_at)}</span>
              </div>
            );
          }
        })}
      </section>
    </main>
  );
}

export default StudentProfile;
