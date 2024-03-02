import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const registerForm = useRef(null);

  const { registerUser, user } = useAuth();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;

    if (password1 !== password2) {
      alert("passwords do not match");
      return;
    }

    const userInfo = { name, email, password1, password2 };

    registerUser(userInfo);
  };

  return (
    <div className="flex justify-center items-center bg-sky-950 h-screen w-full ">
      <div className="flex flex-col items-center -translate-y-20 bg-slate-200	p-20 rounded-lg ">
        <form ref={registerForm} onSubmit={handleSubmit}>
          <h1 className="text-center pb-4 text-4xl -translate-y-5">
            Create an Account
          </h1>
          <div className="flex items-center pb-3">
            <label className="text-xl pr-2">Name:</label>
            <input
              className="h-8 w-full rounded"
              required
              type="text"
              name="name"
              placeholder="Enter name..."
            />
          </div>

          <div className="flex items-center pb-3">
            <label className="text-xl pr-2">Email:</label>
            <input
              className="w-full h-8 rounded"
              required
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>

          <div className="flex items-center pb-3">
            <label className="text-xl pr-2">Password:</label>
            <input
              className="w-full h-8 rounded"
              type="password"
              name="password1"
              placeholder="Enter password..."
            />
          </div>

          <div className="flex items-center">
            <label className="text-xl pr-2">Confirm Password:</label>
            <input
              className=" rounded h-8"
              type="password"
              name="password2"
              placeholder="Confirm password..."
            />
          </div>

          <div className="">
            <input
              type="submit"
              value="Register"
              className="text-xl bg-orange-400 p-2 px-8 rounded-lg mt-6 cursor-pointer mx-auto translate-x-28"
            />
          </div>
        </form>

        <p className="text-lg pt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
