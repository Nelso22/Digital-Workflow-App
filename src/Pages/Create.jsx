import { useState, useRef } from "react";
import { Role, Permission } from "appwrite";
import {
  DATABASE_ID,
  COLLECTION_ID,
  databases,
  VITE_PUBLIC_KEY,
  VITE_TEMPLATE_ID,
  VITE_SERVICE_ID,
} from "../AppwriteConfig";
import { ID } from "appwrite";
import { useAuth } from "../utils/AuthContext";
import emailjs from "@emailjs/browser";

function Create() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const form = useRef();

  let permissions = [
    Permission.update(Role.team("65b70dfff1f5ee079a68")),
    Permission.read(Role.team("65b70dfff1f5ee079a68")),
    Permission.delete(Role.team("65b70dfff1f5ee079a68")),
  ];

  const newTicket = async (e) => {
    e.preventDefault();

    let payload = {
      name,
      email,
      body,
      user_id: user.$id,
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      payload
      // permissions
    );

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

    setName("");
    setEmail("");
    setBody("");
    console.log(form.current.body);
  };

  return (
    <div className="flex justify-center items-center bg-sky-950 h-screen w-full ">
      <div className="flex flex-col items-center -translate-y-20 	p-20 rounded-lg ">
        <form ref={form} onSubmit={newTicket}>
          <h1 className="text-center text-4xl -translate-y-5 text-yellow-300 pb-6">
            Create a Ticket
          </h1>
          <div className="flex items-center pb-3">
            <label className="text-2xl pr-2 text-yellow-300">Name:</label>
            <input
              className="h-10  w-full rounded"
              required
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name..."
            />
          </div>

          <div className="flex items-center pb-3">
            <label className="text-2xl pr-2 text-yellow-300	">
              Phone Number:
            </label>
            <input
              className="w-full h-10 rounded"
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Phone Number..."
            />
          </div>

          <div className="flex items-center pb-3">
            <label className="text-2xl pr-2 text-yellow-300	">
              Description:
            </label>
            <textarea
              rows={5}
              cols={37}
              className="rounded"
              name="body"
              value={body}
              required
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter Description..."
            />
          </div>

          <div className="">
            <input
              type="submit"
              value="Submit"
              className="text-xl bg-orange-400 p-2 px-8 rounded-lg mt-6 cursor-pointer mx-auto translate-x-28 ml-20"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
