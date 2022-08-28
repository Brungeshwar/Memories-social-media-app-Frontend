import PostContextProvider, { PostContext } from "../contexts/postContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { PostsData } = useContext(PostContext);
  const { id } = useParams();
  //console.log(PostsData);
  //console.log(id);
  let postdetails;
  for (let i = 0; i < PostsData.length; i++) {
    if (id == PostsData[i]._id) {
      //console.log(PostsData[i]);
      postdetails = PostsData[i];
    }
  }
  if (!postdetails) return <></>;
  return (
    <div className="p-16">
      <div className="m-8 p-4 pb-20 flex flex-row bg-white font-sans justify-around rounded border-2 shadow">
        <div className="font-semibold text-lg w-2/3">
          <h1 className="text-purple-900 font-bold text-5xl">
            {postdetails.title}
          </h1>
          <p className="font-normal text-lg">by-{postdetails.name}</p>
          <br />
          <h1 className="font-bold">Description</h1>
          <p className="font-normal text-sm">{postdetails.message}</p>
        </div>
        <div className="w-1/3 self-center">
          <img
            className="w-full h-60"
            src={postdetails.selectedFile}
            alt="no file"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
