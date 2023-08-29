"use client"
import React, { useState } from 'react';

import {signIn,signOut,useSession} from "next-auth/react"
export default function Signin(){
        // const {data:session,status} = useSession()
     
    return (
        <div className="signin-form" >
                <form style={{display:"flex",flexDirection:"column",width:"50%",alignItems:"center"}}>
                        <label>Email:</label>
                        <input name="email"type="text"/>
                        <label>Password:</label>
                        <input name="password" type="password"/>
                        <button onClick={()=>signIn()}>Signin</button>
                </form>
        </div>
    )
}