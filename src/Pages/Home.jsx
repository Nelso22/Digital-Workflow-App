import { useAuth } from "../utils/AuthContext";
import { NavLink } from "react-router-dom";

function Home() {
  const { user } = useAuth();

  // console.log(user);
  return (
    <div className="h-screen bg-sky-950">
      <div className="flex items-center translate-y-32 flex-col max-w-6xl mx-auto	">
        <h1 className="capitalize text-yellow-300	text-4xl">
          How may we help you?
        </h1>

        <NavLink
          to="/create"
          className="w-96 border p-3 rounded translate-y-16 text-center bg-yellow-400 text-blue-950	 text-xl	"
        >
          New Ticket
        </NavLink>

        <NavLink
          to="/tickets"
          className="w-96 border p-3 rounded translate-y-16 text-center bg-yellow-400 text-blue-950	 text-xl mt-8	"
        >
          View Tickets
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
