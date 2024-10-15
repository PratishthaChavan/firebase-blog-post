import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Posts from "./Posts";
import { FaRegComments } from "react-icons/fa";
import OpenComment from "./action/openComment";
import Loading from "../../Loading/Loading";
import Followbtn from "../../home/userTofollow/followbtn";
import { useBlog } from "../../../context/context";
import { readtime } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import SavePost from "./action/SavePost";
import moment from "moment";
import Action from "./action/Action";
import Comments from "../comments/comments";
import Like from "./action/like";
import Sharepost from "./action/sharepost";
import Recommended from "./recommended";
import { useRef } from "react";

const SinglePost = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [loading, setLoading] = useState("");
  const { currentUser } = useBlog();
  const navigate = useNavigate();
  const isInitialRender = useRef(true);
  const fetchPost = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      const getPost = await getDoc(postRef);
      if (getPost.exists()) {
        const postData = getPost.data();
        if (postData?.userId) {
          const userRef = doc(db, "users", postData?.userId);
          const getuser = await getDoc(userRef);
          if (getuser.exists()) {
            const getData = getuser.data();
            setPost({ ...postData, ...getData, id: postId });
          }
        }
      }
    } catch (error) {
      console.log("internal server error");
    }
  };
  useEffect(() => {
   
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (isInitialRender?.current) {
      const incrementPageView = async() => {
        try {
          const ref = doc(db,"posts",postId);
          await updateDoc(ref,{
            pageview : increment(1),
          },{merge:true})
        } catch (error) {
          console.log("pageView is not incremented");
        }
      }
      incrementPageView();
    }
    isInitialRender.current = false;
  },[])
const { title, desc, postImg, username, created, image, userId } = post;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="w-[90%] md:w-[80%] mx-auto lg:w-[60%] py-[3rem]">
          <h2 className="text-4xl font-extrabold capitalize">{title}</h2>
          <div className="flex items-center gap-4 py-[2rem]">
            <img
              onClick={() => {
                navigate(`/profile/${userId}`);
              }}
              className="w-[3rem] h-[3rem] object-cover rounded-full cursor-pointer"
              src={image || "/profile.jpg"}
              alt=""
            />
            <div className="capitalize">
              <span>{username}.</span>
              {currentUser?.uid !== userId && <Followbtn userId={userId} />}
              <p className="text-gray-500 text-sm ">
                {readtime({ __html: desc })} min read.
                <span className="ml-1">{moment(created).fromNow()}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center border-b border-t justify-between
           border-gray-200 py-[0.5rem]">
            <div className="gap-5 flex items-center">
              <Like postId={postId}></Like>
              <OpenComment></OpenComment>
            </div>
            <div className="flex items-center gap-5 pt-2">
              <SavePost post={post} />
              <Sharepost></Sharepost>
              {currentUser?.uid === post?.userId && (
                <Action postId={postId} title={title} desc={desc} />
              )}
            </div>
          </div>
          <div className="mt-[3rem]">
            {postImg && (
              <img
                className="w-full h-[400px] object-cover"
                src={postImg}
                alt="Post image"
              />
            ) 
            }
        <div className="mt-6 clearfix">
            <div
              className="overflow-auto"
              dangerouslySetInnerHTML={{ __html: desc }}
           ></div>
        </div>
          </div>
        </section>
      )}
      <Recommended post={post} postId={postId}></Recommended>
      <Comments post={post} postId={postId}></Comments>
    </>
  );
};

export default SinglePost;
