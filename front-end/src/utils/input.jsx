import React from 'react';

const Input = ({ type, title, form ,name, setForm}) => {
  const handleChange = (e) => {
    setForm({...form,[e.target.name] : e.target.value});
    
  }
  return (
    <div className='flex flex-col gap-2'>
      <label>{title}</label>
      <input
        className='text-center border-b border-black outline-none'
        type={type}
        title={title}
        name={name}

        
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
