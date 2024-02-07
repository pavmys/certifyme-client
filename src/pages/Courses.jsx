import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderWithLogin from "../components/HeaderWithLogin";
import "../styles/Courses.css";
import SubjectPic from "../img/subject_pic.png";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function Courses() {
  const { currentUser } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/subject/getSubjects",
          { withCredentials: true }
        );
        setSubjects(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {currentUser && <HeaderWithLogin />}

      <main className="dashboard__main">
        <h2>ВСІ КУРСИ</h2>
        <section className="dashboard__courses">
          {subjects.map((subject) => (
            <Link
              className="dashboard__course"
              key={subject.id}
              to={`/courses/${subject.id}`}
            >
              <img src={SubjectPic} alt="you sabaki" />
              <h3>{subject.course_name}</h3>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Courses;
