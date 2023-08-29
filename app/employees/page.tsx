import { redirect } from 'next/navigation'
import { useEffect, useState } from "react"

import { Employee } from "../api/employee/register/route"


export default async function Users  () {
    // const {data:session,status} = useSession() 
    // if(status==="unauthenticated"){
    //   return   redirect('/')
    // }
    const data =  await fetch("http://localhost:3000/api/employee/list",{cache:"no-cache"},{
      method:"GET",
      
  })
  const Employees:Employee[] =await data.json()
   
  
    return (
      
      <div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <h1>Employees List</h1>
            <input placeholder="Search For Employee"/>
        </div>
       
        <ul>
            {Employees.map((employee:Employee,index:Number)=>(
                <div key={index} className="user-item" style={{padding:"20px",display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"gray",margin:"10px",color:"#fff"}}>
                       <div>
                          <p>{employee.firstName}</p>
                           <img style={{width:'50px',height:"50px"}} src={`${employee.avatar}`} alt={`${employee.firstName}'s QR Code`} />

                       </div>
                        

                        <img src={`${employee.qrCode}`} alt={`${employee.firstName}'s QR Code`} />

                        <div className="btns">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                       
                </div>
            ))}
        </ul>
      </div>
    );
  };

// export default async function usersFetcher(){
    
// }