// components/UserForm.js
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {connect} from "../../libs/db"
import User from "../../models/employee.js"
import { redirect } from 'next/navigation.js';
import { signIn } from "next-auth/react"

// import User from '../models/User';

const UserForm = ({ initialValues = {} }) => {
  const [values, setValues] = useState(initialValues);

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
      
      <button onClick={() => signIn("github")}>Sign in with github</button>

      <button type="submit"  style={{fontSize:"26px"}}>Save</button>
    </form>
  );
};

export default UserForm;
