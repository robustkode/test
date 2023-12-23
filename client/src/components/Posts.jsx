import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Post from "./Post";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Posts = forwardRef(
  ({ userId, handleBeFriend = null, editProfile }, ref) => {
    const [posts, setPosts] = useState([]);
    const getPosts = async () => {
      const response = await fetch(
        "https://test-beryl-rho-23.vercel.app//posts",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setPosts(data);
    };

    useImperativeHandle(ref, () => ({
      reload() {
        getPosts();
      },
    }));
    const token = useSelector((state) => state.token);

    const getUserPosts = async () => {
      const response = await fetch(
        `https://test-beryl-rho-23.vercel.app//posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setPosts(data);
    };

    useEffect(() => {
      if (handleBeFriend || editProfile) {
        getUserPosts();
      } else {
        getPosts();
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePatchLike = (updatedPost) => {
      const postIndex = posts.findIndex((post) => post._id === updatedPost._id);
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = updatedPost;
      setPosts(updatedPosts);
    };

    return (
      <>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <Post
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              handleBeFriend={handleBeFriend}
              handlePatchLike={handlePatchLike}
            />
          )
        )}
        {editProfile & !posts.length ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70vh"
          >
            <Typography>You haven't posted yet</Typography>
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default Posts;
