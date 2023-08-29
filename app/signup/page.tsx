// components/UserForm.js
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import User from "../../models/employee.js"
import { redirect } from 'next/navigation.js';
import {signIn,signOut, useSession} from "next-auth/react"

// import User from '../models/User';

const UserForm = ({ initialValues = {} }) => {
  const [values, setValues] = useState(initialValues);
  const session = useSession()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response  = fetch("http://localhost:3000/api/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      }).then(redirect('/signin'))
    }catch(err){
      console.log(err)
    }
    

  };

  return (
    <form style={{display:"flex",flexDirection:"column",padding:"20px"}}>
      <input
      style={{fontSize:"26px"}}
        type="text"
        name="username"
        value={values.username || ''}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
       style={{fontSize:"26px"}}
        type="email"
        name="email"
        value={values.email || ''}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
       style={{fontSize:"26px"}}
        type="password"
        name="password"
        value={values.password || ''}
        onChange={handleChange}
        placeholder="Password"
      />
      
      <button className="btn" onClick={()=>signIn("google")}>Signin</button>

      <button className="btn" onClick={()=>signIn("google")}>Signin</button>
    </form>
  );
};

export default UserForm;
