import Form from "./components/Form";
import Posts from "./components/Posts";
import PostContextProvider from "./contexts/postContext";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import PostDetails from "./pages/PostDetails";
import SignUp from "./pages/SignUp";
import UserContextProvider, { UserContext } from "./contexts/userContext";
import { useContext } from "react";
function App() {
  const { getuserdata } = useContext(UserContext);
  return (
    <div className="h-fit">
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />

            <Route path="/posts" element={<Home />} />

            <Route
              path="/signup"
              element={!getuserdata() ? <SignUp /> : <Navigate to="/posts" />}
            />
            <Route path="/posts/:id/" element={<PostDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
