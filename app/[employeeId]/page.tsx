"use client"
import { useEffect,useState } from "react"
import { Employee } from "../api/employee/register/route"
import { useParams } from "next/navigation"
export default  function Page() {
  const [data,setData] = useState<any>(null)
  const {employeeId}:string = useParams()
  useEffect(()=>{
    const fetcher =  async (employeeId:string)=>{
      const response= await fetch(`http://localhost:3000/api/employee/${employeeId}`,{cache:"no-cache"})
      const employee = await response.json()
      setData(employee)
    }
    fetcher(employeeId)
    console.log(data)

  },[])
    return( <div>
      
          <div>{data?(
            <div>
              <h3>{data.data.firstName}</h3>
              <img style={{width:"250px"}} src={data.data.avatar}/>
                {data.data.firstName}
                <img src={data.data.qrCode}/>
            </div>
          ):<div>
            ta7chelik
            </div>}</div>
       </div>)
  }