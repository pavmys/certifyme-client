import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      inputs,
      { withCredentials: true }
    );
    setCurrentUser(res.data);
    // console.log(res);
  };

  // const logout = async (inputs) => {
  //   await axios.post("http://localhost:8000/api/auth/logout", inputs);
  //   setCurrentUser(null);
  // };

  async function logout(inputs) {
    await axios.post("http://localhost:8000/api/auth/logout", inputs, {
      withCredentials: true,
    });
    setCurrentUser(null);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
