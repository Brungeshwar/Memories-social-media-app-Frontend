import { useContext, useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useLocation, useNavigate } from "react-router-dom";
import { PostContext } from "../contexts/postContext";
import { UserContext } from "../contexts/userContext";

const Form = () => {
  const navigate = useNavigate();
  const { addPost, formData, updatePost, setformEmpty } =
    useContext(PostContext);
  const { getuserdata } = useContext(UserContext);

  // console.log(state);
  const [postInfo, setpostInfo] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  useEffect(() => {
    //console.log(postInfo._id);
    let tagsString = formData.tags.join(",");
    setpostInfo({
      title: formData.title,
      message: formData.message,
      tags: formData.tags,
      selectedFile: formData.selectedFile,
    });
    setTags(tagsString);
  }, [formData]);

  const [Tags, setTags] = useState("");
  const SubmmitFunction = async (e) => {
    e.preventDefault();
    postInfo.tags = Tags.split(",");
    const url = "https://memories-social-media-backend.herokuapp.com/posts/";
    if (formData._id === "") {
      //console.log("create");
      //create fetch
      let header;
      if (getuserdata()) {
        header = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getuserdata().token}`,
        };
      } else {
        header = {
          "Content-Type": "application/json",
        };
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            ...postInfo,
            name: getuserdata().result.name,
          }),
          headers: header,
        });
        let { Post } = await response.json();
        console.log(Post);
        addPost(Post);
      } catch (err) {
        return console.log(err);
      }
    } else {
      //put fetch
      let header;
      if (getuserdata()) {
        header = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getuserdata().token}`,
        };
      } else {
        header = {
          "Content-Type": "application/json",
        };
      }
      console.log("update");
      try {
        const response = await fetch(url + `${formData._id}`, {
          method: "PATCH",
          body: JSON.stringify(postInfo),
          headers: header,
        });
        let Post = await response.json();
        console.log(Post);
        updatePost(Post);
      } catch (err) {
        return console.log(err);
      }
    }
    setpostInfo({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
    setTags("");
    setformEmpty();
  };
  //
  const [searchMemories, setMemories] = useState("");
  const [searchtags, setsearchTags] = useState("");
  //console.log(useLocation());
  const searchButton = () => {
    //console.log(searchMemories);
    //console.log(searchtags);
    if (searchMemories === "" && searchtags === "") {
      navigate("/posts");
    } else if (searchMemories === "") {
      //console.log("dd");
      navigate(`/posts/?tags=${searchtags}`);
    } else if (searchtags === "") {
      navigate(`/posts/?searchQuery=${searchMemories}`);
    } else navigate(`/posts/?searchQuery=${searchMemories}&tags=${searchtags}`);
    setMemories("");
    setsearchTags("");
  };
  return (
    <div className="m-2 mt-20 w-2/6 bg-white p-2 border-2 h-min shadow-lg absolute top-11 right-0 ">
      <div className="bg-white p-2">
        <div className="border-2 my-2">
          <input
            type="text"
            required
            className="p-2 w-full"
            value={searchMemories}
            placeholder="Search memories"
            onChange={(e) => {
              setMemories(e.target.value);
            }}
          />
        </div>
        <div className="border-2 my-2">
          <input
            type="text"
            required
            className="p-2 w-full "
            value={searchtags}
            placeholder="Search tags"
            onChange={(e) => {
              setsearchTags(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="bg-blue-900 text-white p-2 rounded-sm w-full"
          onClick={searchButton}
        >
          Search
        </button>
      </div>

      {getuserdata() ? (
        <div className="font-sans w-autos  drop-shadow-lg m-2 p-4 shadow bg-white h-min overflow-hidden">
          <h1 className="font-bold m-2 text-center">Create a memory list</h1>
          <form onSubmit={SubmmitFunction}>
            <ul className="font-sans flex flex-col gap-2 font-medium">
              <li className="border-2">
                <input
                  type="text"
                  required
                  className="p-2 w-full"
                  value={postInfo.title}
                  placeholder="Title"
                  onChange={(e) =>
                    setpostInfo({ ...postInfo, title: e.target.value })
                  }
                />
              </li>
              <li className="border-2">
                <input
                  type="text"
                  required
                  className="p-2 w-full"
                  value={postInfo.message}
                  placeholder="Message"
                  onChange={(e) =>
                    setpostInfo({ ...postInfo, message: e.target.value })
                  }
                />
              </li>
              <li className="border-2">
                <input
                  type="text"
                  required
                  className="p-2 w-full"
                  placeholder="Tags"
                  value={Tags}
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                />
              </li>
              <li>
                <FileBase64
                  type="file"
                  required
                  multiple={false}
                  onDone={({ base64 }) => {
                    setpostInfo({ ...postInfo, selectedFile: base64 });
                  }}
                />
              </li>

              <li>
                <button
                  type="submit"
                  className="bg-blue-900 text-white p-2 rounded-sm w-full"
                >
                  {" "}
                  Create
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-sm w-full"
                  onClick={() => {
                    setpostInfo({
                      title: "",
                      tags: [],
                      message: "",

                      selectedFile: "",
                    });
                    setTags("");
                    setformEmpty();
                  }}
                >
                  {" "}
                  CLEAR
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : (
        <div className="bg-red-300 p-2 text-stone-800 rounded m-2">
          <p className="font-semibold">
            Please sign in to create your own memories and like other's memories
          </p>
        </div>
      )}

      <div>
        <ul className="flex flex-row justify-between  m-2 font-dark">
          <li
            className="rounded-full border  px-2 py-0.5 m-1 mt-2 cursor-pointer bg-blue-900 text-white hover:bg-blue-600"
            onClick={() => {
              navigate("/posts/?page=1");
            }}
          >
            1
          </li>
          <li
            className="rounded-full border  px-2 py-0.5 m-1 mt-2 cursor-pointer bg-blue-900 text-white hover:bg-blue-600"
            onClick={() => navigate(`/posts/?page=2`)}
          >
            2
          </li>
          <li
            className="rounded-full border  px-2 py-0.5 m-1 mt-2 cursor-pointer bg-blue-900 text-white hover:bg-blue-600"
            onClick={() => navigate(`/posts/?page=3`)}
          >
            3
          </li>
          <li
            className="rounded-full border  px-2 py-0.5 m-1 mt-2 cursor-pointer bg-blue-900 text-white hover:bg-blue-600"
            onClick={() => navigate(`/posts/?page=4`)}
          >
            4
          </li>
          <li
            className="rounded-full border  px-2 py-0.5 m-1 mt-2 cursor-pointer bg-blue-900 text-white hover:bg-blue-600"
            onClick={() => navigate(`/posts?page=5`)}
          >
            5
          </li>
          <li
            className="rounded-full border px-2 py-0.5 m-1 mt-2 cursor-pointer bg-blue-900 text-white hover:bg-blue-600"
            onClick={() => navigate(`/posts?page=6`)}
          >
            6
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Form;
