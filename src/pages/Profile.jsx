import React, { useContext, useEffect, useState } from "react";
import "../styles/Profile.css";
import HeaderWithLogin from "../components/HeaderWithLogin";
import StudentProfile from "../components/StudentProfile";
import TeacherProfile from "../components/TeacherProfile";
import AdministratorProfile from "../components/AdministratorProfile";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import DekanOrZavKafedryProfile from "../components/DekanOrZavKafedryProfile";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  let cathedra = "";
  switch (currentUser.cathedra_id) {
    case 1: {
      cathedra = "Кафедра системного проектування";
      break;
    }
    case 2: {
      cathedra = "Кафедра оптоелектроніки та інформаційних технологій";
      break;
    }
    case 3: {
      cathedra = "Кафедра радіоелектронних і комп'ютерних систем";
      break;
    }
    case 4: {
      cathedra = "Кафедра радіофізики та комп'ютерних технологій";
      break;
    }
    case 5: {
      cathedra = "Кафедра сенсорної та напівпровідникової електроніки";
      break;
    }
    case 6: {
      cathedra = "Кафедра фізичної та біомедичної електроніки";
      break;
    }
  }

  // get teacher's courses in profile page
  if (currentUser.type === "Викладач") {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/api/subject/getProfileSubjects",
            { withCredentials: true }
          );
          setTeacherSubjects(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  }

  // for zavkafedry and dekanat
  if (
    currentUser.type === "Завідувач кафедри" ||
    currentUser.type === "Деканат"
  ) {
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const res = await axios.get(
    //         // "http://localhost:8000/api/subject/getProfileSubjects",
    //         { withCredentials: true }
    //       );
    //       // setTeacherSubjects(res.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    //   fetchData();
    // }, []);
  }

  return (
    <div className="profile-page">
      <HeaderWithLogin />

      {currentUser.type === "Студент" && (
        <StudentProfile
          surname={currentUser.surname}
          name={currentUser.name}
          group={`${currentUser.potik}-${currentUser.course_number}${currentUser.group_number}`}
        />
      )}

      {currentUser.type === "Викладач" && (
        <TeacherProfile
          surname={currentUser.surname}
          name={currentUser.name}
          cathedra={cathedra}
          subjects={teacherSubjects}
        />
      )}

      {currentUser.type === "Адміністратор" && (
        <AdministratorProfile
          surname={currentUser.surname}
          name={currentUser.name}
          type={currentUser.type}
        />
      )}

      {(currentUser.type === "Завідувач кафедри" ||
        currentUser.type === "Деканат") && (
        <DekanOrZavKafedryProfile
          surname={currentUser.surname}
          name={currentUser.name}
          type={currentUser.type}
        />
      )}
    </div>
  );
}

export default Profile;
