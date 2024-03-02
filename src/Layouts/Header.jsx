import { NavLink, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close the mobile navigation menu when the location changes
    setOpen(false);
  }, [location]);

  const { user, logoutUser } = useAuth();

  return (
    <div className="max-w-full">
      <header className="bg-sky-950">
        <nav className="lg:flex items-center justify-between px-20 pt-4 hidden">
          <div className="flex items-center gap-6">
            {user ? (
              <p className="text-2xl  text-slate-50"> &#128075; {user.name}</p>
            ) : (
              ""
            )}
            <p className="text-2xl text-slate-50">TechTicket Hub</p>
          </div>
          <div className="mr-5">
            {user ? (
              // Content for logged-in user
              <>
                <NavLink to="/" className="text-2xl text-slate-50">
                  Home
                </NavLink>

                <NavLink to="/tickets" className="text-2xl pl-10 text-slate-50">
                  All Tickets
                </NavLink>

                <NavLink to="/create" className="text-2xl pl-10 text-slate-50">
                  Create Ticket
                </NavLink>

                <button
                  onClick={logoutUser}
                  className="text-2xl pl-10 text-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              // Content for not logged-in user
              <>
                <NavLink to="/login" className="text-2xl text-slate-50">
                  Login
                </NavLink>
                <NavLink to="/signUp" className="text-2xl pl-10 text-slate-50">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </nav>

        <nav>
          <CiMenuBurger
            color="black"
            size={55}
            className="lg:hidden absolute right-4 top-4 cursor-pointer z-20"
            onClick={() => setOpen(!open)}
          />
          <div
            className={`justify-center items-center flex-col flex gap-5 lg:hidden absolute w-80 top-0 right-3 bg-yellow-500 p-8 z-10 transition-all ${
              open ? "translate-x-0" : "translate-x-[120%]"
            }`}
          >
            {user ? (
              <p className="text-2xl text-gray-100"> &#128075; {user.name}</p>
            ) : (
              ""
            )}

            <p className="text-2xl text-gray-100">TechTicket Hub</p>

            {user ? (
              // Content for logged-in user
              <>
                <NavLink to="/" className="text-2xl text-gray-100		">
                  Home
                </NavLink>

                <NavLink
                  to="/tickets"
                  className="text-2xl pl-10 text-gray-100		 -translate-x-4"
                >
                  All Tickets
                </NavLink>

                <NavLink
                  to="/create"
                  className="text-2xl pl-10 text-gray-100	 -translate-x-4"
                >
                  Create Ticket
                </NavLink>

                <button
                  onClick={logoutUser}
                  className="text-2xl pl-10 text-gray-100	 -translate-x-4"
                >
                  Logout
                </button>
              </>
            ) : (
              // Content for not logged-in user
              <>
                <NavLink to="/login" className="text-2xl text-slate-50">
                  Login
                </NavLink>
                <NavLink to="/signUp" className="text-2xl pl-10 text-slate-50">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
