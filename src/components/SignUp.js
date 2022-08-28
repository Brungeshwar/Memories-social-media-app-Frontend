import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { GoogleLogin } from "react-google-login";
import { Icon } from "../assests/googleicon";
const ProfileInfo = {
  firstname: "",
  secondname: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const navigate = useNavigate();

  const [isSignup, setSignup] = useState(false);
  const [UserInfo, setUserInfo] = useState(ProfileInfo);
  const { setuserdata } = useContext(UserContext);

  const googleSuccess = async () => {};
  const googleError = async (err) => {
    console.log(err);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://memories-social-media-backend.herokuapp.com/user";
    if (isSignup) {
      let data = { email: UserInfo.email, password: UserInfo.password };
      try {
        const response = await fetch(url + "/signin", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        console.log(json);
        setuserdata(json);

        navigate("/");
        //let { Post } = await response.json();
      } catch (err) {
        return console.log(err);
      }
    } else {
      let data = {
        email: UserInfo.email,
        password: UserInfo.password,
        firstname: UserInfo.firstname,
        secondname: UserInfo.secondname,
      };
      try {
        const response = await fetch(url + "/signup", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (response.status === 400) {
          console.log("user already exits try using sign in");
        } else {
          console.log(json);
          setuserdata(json);
          navigate("/");
        }

        //let { Post } = await response.json();
        //console.log(response);
      } catch (err) {
        return console.log(err);
      }
    }
  };
  return (
    <div className="flex flex-row justify-center font-sans pt-20">
      <div className="bg-white w-1/3 p-2 border-2 self-center mt-20 rounded-lg p-4">
        <h1 className="font-bold text-center m-2 text-3xl">
          {" "}
          {isSignup ? "SIGN IN" : "SIGN UP"}
        </h1>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          {!isSignup && (
            <input
              placeholder="First Name*"
              className="border-2 p-2"
              type="text"
              required
              value={UserInfo.firstname}
              onChange={(e) => {
                setUserInfo({ ...UserInfo, firstname: e.target.value });
              }}
            />
          )}
          {!isSignup && (
            <input
              placeholder="Second Name*"
              className="border-2 p-2"
              type="text"
              value={UserInfo.secondname}
              onChange={(e) => {
                setUserInfo({ ...UserInfo, secondname: e.target.value });
              }}
            />
          )}
          <input
            placeholder="Email Address*"
            className="border-2 p-2"
            type="email"
            required
            value={UserInfo.email}
            onChange={(e) => {
              setUserInfo({ ...UserInfo, email: e.target.value });
            }}
          />
          <input
            placeholder="Password*"
            className="border-2 p-2"
            type="password"
            required
            value={UserInfo.password}
            onChange={(e) => {
              setUserInfo({ ...UserInfo, password: e.target.value });
            }}
          />
          {!isSignup && (
            <input
              placeholder="Confirm Password*"
              className="border-2 p-2"
              type="password"
              required
              value={UserInfo.confirmPassword}
              onChange={(e) => {
                setUserInfo({ ...UserInfo, confirmPassword: e.target.value });
              }}
            />
          )}
          <button
            type="submit"
            className={
              isSignup
                ? "bg-red-500 text-white p-2 rounded-sm w-full"
                : "bg-blue-900 text-white p-2 rounded-sm w-full"
            }
          >
            {isSignup ? "SIGN IN" : "SIGN UP"}
          </button>
        </form>
        {/*   <GoogleLogin
          clientId="459793500137-utgm3c6pdd5r5ame7fog6n2ct7g87geb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy={"single_host_origin"}
        />*/}

        <p className="font-semibold text-xs text-right mr-2 mt-2">
          {isSignup ? "DDNT" : "ALREADY"} HAVE AN ACCOUNT{" "}
          <span
            className="hover:text-left cursor-pointer hover:underline "
            onClick={() => {
              setSignup(!isSignup);
            }}
          >
            {isSignup ? "SIGN UP" : "SIGN IN"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
