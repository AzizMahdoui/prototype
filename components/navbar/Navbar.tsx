"use client"
import Link from "next/link";
import "./navbar.css"
import { Redirect } from "next"; 
import {useSession} from "next-auth/react"
import {signIn,signOut} from "next-auth/react"

export default function Navbar(){
        const session = useSession();
        console.log(session.status)
        if(session.status==="authenticated"){
            return (
                <div className="navbar">
                    <h3>Welcome to The APP</h3>
                    <ul>
                            <Link className="link-item" href={'/employees'}>Employees</Link>
                                <button className="btn" onClick={()=>signOut()}>Signout</button>
                    </ul>
                </div>
                    )
        }
        else {
            return (
                <div className="navbar">
                <h3>Welcome to The APP you are not authentificated</h3>
                <ul className="links-list">
                        <Link className="link-item" href={'/employees'}>Employees</Link>
                        <button className="btn" onClick={()=>signIn("github")}>Signin with github</button>
                        <Link className="link-item" href={'/attendance'}>Attendance</Link>



                </ul>
            </div>    
            )
        }
        
      
           
        } 

