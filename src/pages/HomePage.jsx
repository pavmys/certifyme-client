import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/HomePage.css";
import HeaderWithoutLogin from "../components/HeaderWIthoutLogin";
import Loader from "../components/Loader";
import { AuthContext } from "../context/authContext";

function HomePage() {
  const [loaderClass, setLoaderClass] = useState("loader__hidden");

  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
  });
  // console.log(inputs);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const { login } = useContext(AuthContext);
  // console.log(currentUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post(
      //   "http://localhost:8000/api/auth/login",
      //   inputs,
      //   { withCredentials: true }
      // );
      // console.log(res);
      await login(inputs);
      setLoaderClass("loader__visible");
      // setLoaderClass("loader__hidden");
      navigate("/courses");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="home-page">
      <HeaderWithoutLogin />

      <main className="main">
        <div className="main__text">
          <h2>CertifyMe</h2>
          <span>Isn’t it cool to use certificates while studying, yeah?</span>
        </div>
        <form className="main__form">
          <h2>ВХІД</h2>
          <input
            required
            name="user_email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            required
            name="user_password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button onClick={handleLogin}>УВІЙТИ</button>
          {err && <p>{err}</p>}
          <span>
            Не маєте облікового запису? <a href="/register">Зареєструватись</a>
          </span>
        </form>
      </main>

      {/* <div className="loader">
        <span class="loader__span"></span>
      </div> */}
      <Loader className={loaderClass} />
    </div>
  );
}

export default HomePage;