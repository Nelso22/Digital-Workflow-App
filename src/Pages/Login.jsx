import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    loginUser(userInfo);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sky-950">
      <div className="flex flex-col items-center -translate-y-20 bg-slate-200	p-20 rounded-lg 	">
        <form ref={loginForm} onSubmit={handleSubmit} className="">
          <h1 className="text-center pb-4 text-4xl -translate-y-5">
            Welcome Back
          </h1>
          <div className="py-2 flex items-center gap-2">
            <label className="text-xl">Email:</label>
            <input
              className="w-full h-8 rounded"
              required
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>

          <div className="py-2 flex items-center gap-2">
            <label className="text-xl">Password:</label>
            <input
              className="w-full h-8 rounded"
              type="password"
              name="password"
              placeholder="Enter password..."
              autoComplete="password"
            />
          </div>

          <div className="py-2 flex gap-2">
            <input
              type="submit"
              value="Login"
              className="text-xl mx-auto bg-orange-400 p-2 px-8 rounded-lg mt-3 cursor-pointer	"
            />
          </div>
        </form>

        <p className="text-lg mt-5">
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
