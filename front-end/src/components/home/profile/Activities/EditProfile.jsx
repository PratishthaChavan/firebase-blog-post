import React, { useEffect } from 'react'
import Model from '../../../../utils/Model'
import { IoMdClose } from "react-icons/io";
import { useRef } from 'react';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage} from '../../../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = ({editModal,setEditModel,getUserData}) => {
    const imgRef = useRef(null);
    const [imageurl,setImageUrl] = useState("");
    const [form,setForm] = useState({
      username:"",
      userimage:"",
      Bio:""
    })


    const openFile = () => {
        imgRef.current.click();
    }

    useEffect(() => {
       if (getUserData) {
        setForm(getUserData);
       }
       else{
        setForm({username:"",userimage:"",Bio:""});
       }
    },[])
    const saveUserDetails = async() => {
      if(form["username"] === "" || form["Bio"] === ""){
        alert("All fields are required !!!");
        return;
      }
    
      let imageurl = getUserData?.image; // Default to the existing image URL
    
      if (form.userimage) {
        const storageRef = ref(storage, `image/${form.userimage.name}`);
        await uploadBytes(storageRef, form.userimage);
        imageurl = await getDownloadURL(storageRef);
      }

    
      try {
        const docRef = doc(db, "users", getUserData?.userId);
        await updateDoc(docRef, {
          Bio: form.Bio,          // Ensure Bio is passed here
          username: form.username, 
          image: imageurl ? imageurl : form.userimage,       // Use updated or existing image URL
          userId: getUserData?.userId
        });
    
        alert('Profile updated successfully!');
        setEditModel(false); // Close the modal after saving
    
      } catch (error) {
        console.error("Error updating document: ", error);
        alert('Failed to update profile. Please try again.');
      }
    };
  

  return (
    <>
    <Model modal = {editModal} setModal={setEditModel}>
        <div className='center w-[95%] md:w-[45rem] bg-gray-100 mx-auto showdows my-[1rem] z-20 mb-[3rem] p-[2rem]
        '>
           {/*head*/ }
           <div className=' flex items-center justify-between'>
                <h2 className='font-bold text-xl'>Profile Information</h2>
                <button onClick={() => setEditModel(false)} className='text-xl'>
                <IoMdClose />
                </button>
           </div>
              {/*body*/ }

              <section className='mt-6'>
                <p className='pb-3 text-sm text-gray-500'>Photo</p>
                <div className='flex gap-[2rem]'>
                <img className='w-[3.5rem] h-[3.5rem] min-h-[2rem] min-w-[2rem] object-cover border border-gray-400
                rounded-full' 
                src={imageurl ? imageurl : getUserData.image ? getUserData?.image :  "/profile.jpg"} alt="" />
                <>
                <input 
                 onChange={(e) => {
                  setImageUrl(URL.createObjectURL(e.target.files[0])),
                  setForm({...form,userimage:e.target.files[0]})
                }}
                 accept='image/jpg image/png image/jpeg' ref={imgRef} type="file" hidden />
                <div className='flex gap-4 text:sm'>
                 <button onClick={openFile} className='text-green-600'>Update</button>
                 <button className='text-red-600'>Remove</button>
                </div>
                <p className='w-full sm:w-[20rem] text-gray-400 text-sm pt-2'>Recommended: 
                    square JPG,PNG, OR GIF at least 1000 pixel per
                    side 
                </p>
                </>
                </div>
              
              </section>
                 {/*footer*/ }
                 <section className='pt-[1rem] text-sm'>
                    <label className='pb-3 block'>Name:</label>
                    <input 
                   
                    onChange={(e) => {
                      setForm({...form,username:e.target.value})
                    
                    }}
                    value={form.username}
                    type="text" placeholder='Enter Username' className='p-1 border-b border-black
                     w-full outline-none' maxLength={30} />
                     <p className='text-sm pt-2 text-gray-600'>Appear on your Profile Page.the response is 
                      {form.username.length}/30
                     </p>
                   <section className='pt-[1rem] text-sm'>
                   
                   <label className='pb-3 block'>Bio:</label>


                    <input
                    onChange={(e) => {
                      setForm({...form,Bio:e.target.value})
                      
                    }}
                    value={form.Bio}
                     type="text" placeholder='Bio...' className='p-1 border-b border-black
                     w-full outline-none' maxLength={160}/>
                     <p className='text-sm pt-2 text-gray-600'>
                      Appear on your Profile Page the response {form.Bio.length}/160</p>
                   </section>

                 </section>
                 <div className='flex items-center justify-end pt-[2rem] gap-4'>
                    <button
                     onClick={() => {
                      setEditModel(false)
                     }}
                     className='border  border-green-500 px-5 py-2 rounded-full bg text-red-800'>Cancel</button>
                    <button
                    onClick={saveUserDetails}
                    className='border border-red-500 px-5 py-2 rounded-full bg-green-400 text-white'>Save</button>

                 </div>
           </div>
    </Model>
    </>
  )
}

export default EditProfile