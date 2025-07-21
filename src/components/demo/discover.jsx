import React from "react";
import { Discovers } from "../../data";
import { useNavigate } from "react-router-dom";
const Discover = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-[6rem] z-0  ">
      <div className="relative border-b border-gray-400 pb-3 z-0">
        <h1 className="font-bold">
          Discover Your Own interest by Exploring more{" "}
        </h1>
        <div className="my-2 flex items-center gap-3 flex-wrap">
          {Discovers.map((items, i) => (
            <button
              onClick={() => navigate(`/filter/${items.toLowerCase()}`)}
              key={i}
              className="bg-gray-400 py-2 px-3 text-sm rounded-full"
            >
              {items}
            </button>
          ))}
        </div>
        <button className="font-bold text-green-500 text-sm py-3 hover:text-black1 z-0">
          See more Topics
        </button>
      </div>
    </div>
  );
};

export default Discover;
