import React from 'react';
import { useBlog } from '../../context/context';
import { useParams } from 'react-router-dom';


const stripHtmlTags = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const Filter = () => {
  const { tag } = useParams(); 
  const { postdata } = useBlog(); 

 
  const filterData = postdata.filter((post) => post.tags.includes(tag.toLowerCase()));

  return (
    <section className='size my-[2rem]'>
      <div>
        <h3 className='text-xl font-semibold'>
          {filterData.length 
            ? `Posts tagged with "${tag}"` 
            : `No posts found with the tag "${tag}"`}
        </h3>
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
          {filterData.map((post, index) => (
            <div key={index} className='border p-4 rounded-md bg-white'>
              <h4 className='text-lg font-bold'>{post.title}</h4>
              <p className='text-gray-600'>{stripHtmlTags(post.desc)}</p>
         
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Filter;
