import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

   const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        user
      );

     

      console.log(response.data);

      
      setUser({
        name: "",
        email: "",
        password: "",
      });
        navigate("/login");
      
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/20 blur-3xl rounded-full"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl">
        {/* Logo */}
        <h1 className="text-5xl font-black text-center mb-3 bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
          LUXORA
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Create your luxury jewelry account
        </p>

        {/* Form */}
        <form onSubmit={registerUser} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 rounded-2xl text-lg font-bold hover:scale-105 transition duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}