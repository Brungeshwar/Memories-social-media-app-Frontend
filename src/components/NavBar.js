import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
const NavBar = () => {
  const { getuserdata, removeuserdata } = useContext(UserContext);

  //console.log(User);
  //console.log("d");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getuserdata()?.token;
    //console.log("yes url has changed");
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) removeuserdata();
    }

    //setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  //localStorage.clear();
  return (
    <div className="bg-zinc-200 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="font-black text-3xl text-center m-6">
          <Link to="/posts">Memories</Link>
        </h1>
        <div className="flex flex-row gap-2">
          {getuserdata() ? (
            <p className="font-black text-sm mt-6 mr-8">
              {getuserdata().result.name}
            </p>
          ) : (
            ""
          )}
          <button
            className="bg-blue-900 text-white p-2 rounded-lg w-20 h-12 mr-8 self-center shrink"
            onClick={() => {
              if (getuserdata()) {
                removeuserdata();
                navigate("/signup");
                console.log("logout");
              } else {
                navigate("/signup");
              }
            }}
          >
            <p>{getuserdata() ? "Log out" : "Sign in"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
