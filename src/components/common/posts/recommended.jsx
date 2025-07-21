import React from "react";
import UseHooks from "../../hooks/useHooks";
import { useEffect, useState } from "react";
import { readtime } from "../../../utils/helper";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Recommended = ({ post: SinglePost }) => {
  const { data } = UseHooks("posts");

  const [commonTags, setCommonTags] = useState([]);
  useEffect(() => {
    let recommendedPost = [];
    data &&
      data.forEach((post) => {
        if (post.id === SinglePost.id) {
          return;
        }
        const postTag = post.tags;

        const commonTags = postTag.filter((tag) =>
          SinglePost?.tags?.includes(tag)
        );

        if (commonTags.length > 0) {
          recommendedPost.push({
            ...post,
            commonTags,
          });
        }
      });
    recommendedPost.sort(() => Math.round() * -0.5);
    const minRecommendation = 4;
    const slice = recommendedPost.slice(0, minRecommendation);
    setCommonTags(slice);
  }, [data, SinglePost]);

  return (
    <>
      <section className="bg-gray-100">
        <div className="w-[90%] md:w-[90%] ls:w-[60%] mx-auto py-[3rem]">
          <h2 className="text-xl font-bold">Recommend Blog </h2>
          {commonTags.length < 0 ? (
            <p>No recommended post found based on your preference</p>
          ) : (
            <div className="grid grid-cols-card gap-[2rem] my-[3rem] ">
              {commonTags.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Recommended;

const Post = ({ post }) => {
  const { title, postImg, created, desc, id: postId, userId } = post;
  const { data } = UseHooks("users");
  const user = data?.find((user) => user?.id === userId) || {};
  const { username = "Unknown", image: userImg = "" } = user;
  const navigate = useNavigate(null);

  return (
    <div
      onClick={() => {
        navigate(`/post/${postId}`);
      }}
      className="w-full cursor-pointer"
    >
      <img
        className="w-[25rem] h-[270px] object-cover"
        src={postImg}
        alt="post-img"
      />
      <div className="flex items-center gap-1 py-3">
        {userImg ? (
          <img
            className="w-[2rem] h-[2rem] object-cover rounded-full"
            src={userImg}
            alt={username}
          />
        ) : (
          <div className="w-[2rem] h-[2rem] bg-gray-300 rounded-full">
            <img src="/profile.jpg" alt="" />
          </div>
        )}
        <h3 className="text-sm capitalize">{username || "Unknown User"}</h3>
      </div>
      <h2 className="font-extrabold leading-5 line-clamp-2 ">{title}</h2>
      <div
        className="line-clamp-2 my-3 text-gray-500 leading-5"
        dangerouslySetInnerHTML={{ __html: desc }}
      ></div>
      <p className="text-sm text-gray-600 ">
        {readtime({ __html: desc })} min read
        <span className="ml-3">{moment(created).format("MMM DD")}</span>
      </p>
    </div>
  );
};
