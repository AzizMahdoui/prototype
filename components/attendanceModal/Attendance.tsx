"use client"
import { QrReader } from "react-qr-reader"
import { useState } from "react";
import Router from "next/router";
 
export default function AttendanceModal({date,dailyStatusId,status,currentEmployeeId}){
    const [scanResultFile, setScanResultFile] = useState(null);
    const [confirmation,setConfiramtion] = useState(false);
    const [confirmed,setConfirmed] = useState(false);
    const [error,setError] = useState("")
    const [confiramtionData,setConfiramtionData] = useState(null)
    const [employeeId,setEmployeedId] = useState("")


    const handleResultFile = async(result) => {
            // console.log(result!=undefined)
        if (result) {
          const payload  = result.text.split("_")
           const employeeIdPayload = payload[0]
          //  console.log(id)
           if(currentEmployeeId!=employeeIdPayload){
            setError("Wrong Qr Code")
           }
           else
            {setEmployeedId(employeeIdPayload)
            setConfiramtion(true)}

        }
    };
    const handleCheckIn= async()=>{
        const id = dailyStatusId
        console.log({date,id,status})
            const response = await fetch("http://localhost:3000/api/checkin",{
                method:"POST",
                body:JSON.stringify({date,id,status})
            })
            console.log(response)
            const fetchedData = await response.json()
            console.log(fetchedData)
            setConfiramtionData(fetchedData)
            console.log(confiramtionData)
            setConfiramtion(false)
    }
    const handleCheckOut= async()=>{
      const id = dailyStatusId
      console.log({date,id,status})
          const response = await fetch("http://localhost:3000/api/checkin",{
              method:"POST",
              body:JSON.stringify({date,id,status})
          })
          console.log(response)
          const fetchedData = await response.json()
          console.log(fetchedData)
          setConfiramtionData(fetchedData)
          console.log(confiramtionData)
          setConfiramtion(false)
  }
    return (
        <div className="dialog">
          <div>
            <h3>Scan Your Code: yatik asba</h3>
            <QrReader
                style={{ width: "100%" }}
                legacyMode
                onResult={handleResultFile}
                scanDelay={300}
            />
        </div>
      {confirmation && (
        <div>
            <h3>Confirm The Check-In</h3>
            <button onClick={()=>handleCheckIn()}>Confirm</button>
        </div>
      )}
      {confiramtionData.data.employeeDailyStatus.status==="checked-in" ? (
        // <div>Good</div>
        <div>{confiramtionData.data.employeeDailyStatus.employeeId.firstName} Have Been Successfully checked in </div>
      ):(
        <div>{confiramtionData.data.employeeDailyStatus.employeeId.firstName} Have Been Successfully checked out </div>

      )}
      {error && (
        <h3>{error}</h3>
      )}
          </div>
    )
}