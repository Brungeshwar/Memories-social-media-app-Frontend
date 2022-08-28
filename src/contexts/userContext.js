import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [User, setUserdata] = useState(null);
  const setuserdata = (data) => {
    if (data) localStorage.setItem("profile", JSON.stringify(data));
    setUserdata(data);
  };
  const getuserdata = () => {
    let result = JSON.parse(localStorage.getItem("profile"));
    //setuserdata(result);
    return result;
  };
  const removeuserdata = (data) => {
    setUserdata(null);
    localStorage.clear();
    //setUserdata(null);
  };

  return (
    <UserContext.Provider
      value={{
        User,
        setuserdata,
        getuserdata,
        removeuserdata,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
