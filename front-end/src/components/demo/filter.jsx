import React from 'react'
import { useBlog } from '../../context/context'
import { useParams } from 'react-router-dom'
const Filter = () => {

const {tag} = useParams();
const {postdata} = useBlog();
console.log(postdata);

const filterData = postdata.filter((post) => post.tags.includes(tag));
console.log(filterData);
  return (
    <section  className='size my-[2rem] '>
        <div >
        <h3>{filterData.length ? "Your filtered post" : "There is no post with tags"}</h3>
    </div>
    </section>
  )
}

export default Filter