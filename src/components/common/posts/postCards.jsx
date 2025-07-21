import React from "react";
import useHooks from "../../hooks/useHooks";
import { readtime } from "../../../utils/helper";
import moment from "moment";
import SavePost from "./action/SavePost";
import { useBlog } from "../../../context/context";
import Action from "./action/Action";
import { useNavigate } from "react-router-dom";

const PostCards = ({ post }) => {
  const { title, userId, desc, postImg, id: postId, created } = post;
  const { data, loading } = useHooks("users");
  const { currentUser, allUser } = useBlog();
  const navigate = useNavigate();
  const getUserData = allUser.find((user) => user?.id === userId);

  return (
    <>
      <div
        onClick={() => {
          navigate(`/post/${postId}`);
        }}
        className="flex border-r-2 sm:flex-row flex-col-reverse  gap-3 cursor-pointer"
      >
        <div className="w-[12rem]  sm:w-[20rem]">
          <p className="pb-2 sm:text-xl text-sm font-semibold capitalize">
            {getUserData?.username}
          </p>
          <h2 className="sm:text-xl text-sm inline font-bold line-clamp-1 leading-6 capitalize">
            {title}
          </h2>
          <div
            className="py-1 sm:w-[20rem] w-[10rem]  leading-5 text-sm line-clamp-2  text-gray-500 sm:line-clamp-2 "
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
        {postImg && (
          <div className="flex-[1] w-[19rem]  sm:w-[200px] h-[48px] sm:h-[140px] ">
            <img
              src={postImg}
              alt=""
              className="sm:w-[200px] sm:h-[140px] w-[19rem] h-[9rem] object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex  justify-between w-[15rem] md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-400">
          {readtime({ __html: desc })} min read.
          {moment(created).format("MMM DD")}{" "}
        </p>
        <div className="flex items-center gap-3">
          <SavePost post={post} getUserData={getUserData} />
          {currentUser?.uid === userId && (
            <Action postId={postId} title={title} desc={desc} />
          )}
        </div>
      </div>
    </>
  );
};

export default PostCards;
