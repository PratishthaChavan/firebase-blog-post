import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useBlog } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const Search = ({ modal, setModal }) => {
  const [search, setSearch] = useState("");
  const { postdata } = useBlog();
  const navigate = useNavigate();
  
  const searchData = postdata?.filter((post) => 
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const limit = 5; // Set the limit for search results

  return (
    <>
      {modal && (
        <div className="flex items-center gap-1 bg-gray-200 px-2 rounded-full relative z-10 w-[200px]">
          <span className='text-2xl text-gray-400'>
            <CiSearch />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-transparent outline-none py-[0.2rem] text-sm w-full'
            type="text"
            placeholder='Search Medium'
          />
          {search !== "" && (
            <div className='absolute right-0 left-0 top-full bg-white shadow rounded-md'>
              {searchData.length > 0 ? (
                <>
                  {searchData.slice(0, limit).map((post, i) => (
                    <div
                      key={i}
                      onClick={() => { navigate(`/post/${post?.id}`); setSearch(""); }}
                      className='p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer'
                    >
                      <h2 className='line-clamp-1 capitalize font-bold text-sm'>{post.title}</h2>
                      <div className='line-clamp-2 text-xs text-gray-400' dangerouslySetInnerHTML={{ __html: post.desc }} />
                    </div>
                  ))}
                </>
              ) : (
                <p className='p-3 text-gray-400 text-sm'>No post Found</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
