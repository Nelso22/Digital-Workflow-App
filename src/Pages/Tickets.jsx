import React, { useState, useEffect } from "react";
import { databases, DATABASE_ID, COLLECTION_ID } from "../AppwriteConfig";
import { MdDelete } from "react-icons/md";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );
      setTickets(response.documents);
      console.log(response.documents);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const deleteTicket = async (ticket_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID, ticket_id);
    setTickets((prevstate) =>
      tickets.filter((ticket) => ticket_id !== ticket.$id)
    );
  };

  console.log(tickets);

  return (
    <div className="h-screen max-w-full bg-sky-950">
      <table className="w-10/12 mx-auto translate-y-20 border border-yellow-200 text-slate-50">
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-4">Name</th>
            <th className="border-b-2 px-4 py-4">Email</th>
            <th className="border-b-2 px-4 py-4">Description</th>
            <th className="border-b-2 px-4 py-4 -translate-x-12">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.$id}>
              <td className="border-b px-4 py-4 text-center">{ticket.name}</td>
              <td className="border-b px-4 py-4 text-center">{ticket.email}</td>
              <td className="border-b px-4 py-4 text-center">{ticket.body}</td>
              <td className="border-b py-4 px-7">
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => deleteTicket(ticket.$id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tickets;
