import { createContext, useContext, useState } from "react";
import Form from "../components/Form";
import { UserContext } from "./userContext";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [PostsData, setPostData] = useState([]);
  const { getuserdata } = useContext(UserContext);
  const [formData, setformData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
    _id: "",
  });
  const addPost = (obj) => {
    setPostData([...PostsData, obj]);
  };
  const setPost = (data) => {
    setPostData([...data]);
  };
  const removePost = (id) => {
    setPostData(PostsData.filter((e) => e._id != id));
  };
  const updatePost = (post) => {
    let dummyArray = PostsData.filter((e) => e._id !== post._id);
    setPostData([...dummyArray, post]);
  };

  const setformInfo = (id) => {
    let FormData = PostsData.filter((e) => e._id === id);
    setformData({
      title: FormData[0].title,
      message: FormData[0].message,
      tags: FormData[0].tags,
      selectedFile: FormData[0].selectedFile,
      _id: FormData[0]._id,
    });
  };
  const setformEmpty = () => {
    setformData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
      _id: "",
    });
  };
  const updateLikes = (id) => {
    let dummy = PostsData.map((e) => {
      if (e._id === id) {
        if (e.likeCount.indexOf(getuserdata().result._id) === -1) {
          e.likeCount.push(getuserdata().result._id);
          //console.log("yes");
        } else {
          e.likeCount = e.likeCount.filter(
            (e) => e != getuserdata().result._id
          );
          //console.log("no");
        }

        return e;
      } else return e;
    });
    setPostData(dummy);
  };
  return (
    <PostContext.Provider
      value={{
        PostsData,
        addPost,
        removePost,
        setPost,
        formData,
        setformInfo,
        updatePost,
        setformData,
        setformEmpty,
        updateLikes,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
