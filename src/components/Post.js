import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../contexts/postContext";
import { UserContext } from "../contexts/userContext";
const Post = ({
  title,

  tags,
  creator,
  selectedFile,
  createdAt,
  name,
  _id,
  likeCount,
}) => {
  //console.log(likeCount);

  const { setformInfo, removePost, updateLikes } = useContext(PostContext);
  const navigate = useNavigate();
  const { getuserdata } = useContext(UserContext);
  const updateFunction = () => {
    //console.log(_id);
    setformInfo(_id);
  };
  function convertDate(date) {
    date = new Date(date);
    var day = date.getDate();
    day = day < 10 ? "0" + day : day;
    var month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var year = date.getFullYear();
    return day + "." + month + "." + year;
  }
  //console.log(likeCount.indexOf(`${getuserdata()?.result?._id}`));
  const [like, setLike] = useState(
    likeCount?.indexOf(`${getuserdata()?.result?._id}`) !== -1
  );
  //if (like) console.log("dhoni");
  const deleteFunction = async () => {
    const url = "https://memories-social-media-backend.herokuapp.com/posts/";
    try {
      let header;
      if (!getuserdata()) {
        header = {
          "Content-Type": "application/json",
        };
      } else {
        header = {
          "Content-Type": "application/json", //sending the token to check the user what is he claiming to be
          Authorization: `Bearer ${getuserdata().token}`,
        };
      }
      const response = await fetch(url + `${_id}`, {
        method: "DELETE",
        headers: header,
      });
      //let Post = await response.json();
      //console.log(Post);
    } catch (err) {
      return console.log(err);
    }
    removePost(_id);
  };
  const likeFunction = async () => {
    try {
      let header;
      if (!getuserdata()) {
        header = {
          "Content-Type": "application/json",
        };
      } else {
        header = {
          "Content-Type": "application/json", //sending the token to check the user what is he claiming to be
          Authorization: `Bearer ${getuserdata().token}`,
        };
      }
      const response = await fetch(
        `https://memories-social-media-backend.herokuapp.com/posts/${_id}/likePost`,
        {
          method: "PATCH",
          headers: header,
        }
      );
      let Post = await response.json();
      //console.log(Post);
      updateLikes(_id);
      setLike(!like);
    } catch (err) {
      return console.log(err);
    }
  };
  const postFunction = () => {
    navigate(`/posts/${_id}`);
  };

  return (
    <div className="font-sans rounded-3xl m-2 shadow-lg w-80 cursor-pointer bg-white  ">
      <div
        style={{ backgroundImage: `url(${selectedFile})` }}
        className="w-full h-60 text-white p-3 rounded-t-xl flex flex-row flex-wrap justify-between"
      >
        <div onClick={postFunction} className="font-bold">
          <p className="text-sm font-bold">
            {convertDate(createdAt)}
            {/*formatDistanceToNow(new Date(createdAt), { addSuffix: true })*/}
          </p>

          <p>{name}</p>
        </div>
        <div className="ml-3 font-bold">
          {getuserdata() && getuserdata().result._id === creator ? (
            <button className="text-white text-2xl" onClick={updateFunction}>
              ...
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="p-4">
        <span className="text-slate-500 text-sm">
          {tags?.map((ele) => "#" + ele + " ")}
        </span>
        <p className="font-bold text-lg text-neutral-900">{title}</p>

        <div className="flex flex-row justify-between mt-2 mb-2">
          <div className="flex flex-row ">
            {getuserdata() ? (
              <div>
                <i
                  //className="fas fa-thumbs-up cursor-pointer mt-1 text-blue-700"
                  className={
                    like
                      ? " fas fa-thumbs-up cursor-pointer mt-1 text-blue-700"
                      : "fas fa-thumbs-up cursor-pointer mt-1 text-blue-200 bg-white"
                  }
                  onClick={likeFunction}
                ></i>
                <p className="ml-2">{likeCount?.length}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-1 mr-1">
            {getuserdata() && getuserdata().result._id == creator ? (
              <i
                className="fas fa-trash cursor-pointer text-indigo-700"
                onClick={deleteFunction}
              ></i>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
