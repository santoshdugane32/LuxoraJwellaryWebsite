import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {

    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        loginData
      );

      console.log("Login Response:", response.data);

      const userData = response.data;

      // Save complete response
      localStorage.setItem("user", JSON.stringify(userData));

      // Save token separately (optional)
      if (userData.token) {
        localStorage.setItem("token", userData.token);
      }

      // Update Auth Context
      login(userData);

      alert(userData.message || "Login Successful");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data || "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/20 blur-3xl rounded-full"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl">

        <h1 className="text-5xl font-black text-center mb-3 bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
          LUXORA
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Login to your luxury jewelry account
        </p>

        <form className="space-y-6" onSubmit={loginUser}>

          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white"
          />

          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 rounded-2xl font-bold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}