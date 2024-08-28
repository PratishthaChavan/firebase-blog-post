import React from 'react';
import { CiSearch } from "react-icons/ci";

const Search = ({ modal, setModal }) => {
  return (
    <>
      {modal && (
        <div className="flex items-center gap-1 bg-gray-200 px-2 rounded-full relative z-10 w-[200px]">
          <span className='text-2xl text-gray-400'>
            <CiSearch />
          </span>
          <input
            className='bg-transparent outline-none py-[0.2rem] text-sm w-full'
            type="text"
            placeholder='Search Medium'
          />
        </div>
      )}
    </>
  );
};

export default Search;
