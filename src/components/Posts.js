import { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/postContext";
import { UserContext } from "../contexts/userContext";
import { useLocation } from "react-router-dom";
import Post from "./Post";
import ClipLoader from "react-spinners/ClipLoader";
const Posts = ({ searchQuery, page, searchtagQuery }) => {
  const { PostsData, setPost } = useContext(PostContext);
  //console.log(PostsData);
  const { getuserdata, removeuserdata } = useContext(UserContext);
  //console.log(User);
  let location = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      let url = "https://memories-social-media-backend.herokuapp.com/posts";
      if (searchQuery || searchtagQuery)
        url = url + `/search/${location.search}`;
      else url = url + `/?page=${page}`;

      //console.log(searchQuery);

      const response = await fetch(url);
      const json = await response.json();

      if (response.ok) {
        setPost(json);
        //console.log(json);
      }
    };

    fetchPosts();
  }, [location]);
  if (PostsData.length == 0)
    return (
      <div className="w-4/6">
        <ClipLoader color="#ffffff" loading={true} size={100} />
      </div>
    );

  return (
    <div className="w-4/6">
      <div className=" flex flex-row gap-2 flex-wrap ">
        {PostsData.length > 0 &&
          PostsData.map((post) => (
            <Post
              title={post?.title}
              creator={post?.creator}
              key={post?._id}
              _id={post?._id}
              tags={post?.tags}
              name={post?.name}
              selectedFile={post?.selectedFile}
              createdAt={post?.createdAt}
              likeCount={post?.likeCount}
            />
          ))}
      </div>
    </div>
  );
};

export default Posts;
