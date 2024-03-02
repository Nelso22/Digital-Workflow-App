import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../AppwriteConfig";
import { ID } from "appwrite";
import { Navigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);

    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );

      let accountDetails = await account.get();

      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);

    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );

      await account.createEmailSession(userInfo.email, userInfo.password1);
      let accountDetails = await account.get();
      setUser(accountDetails);
      Navigate("/");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
      // console.log(user);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const submitTicket = async (e) => {
    e.preventDefault();
  };

  const Utils = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    loading,
  };

  return (
    <AuthContext.Provider value={Utils}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
