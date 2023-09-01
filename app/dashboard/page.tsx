"use client"
import io from "socket.io-client";
import { QrReader}  from "react-qr-reader"
import Router from "next/router";
import AttendanceModal from "../../components/attendanceModal/Attendance";
import { useState ,useEffect} from "react";
import './dashboard.css'
import Link from "next/link";

export default function Dashboard() {
  const [date, setDate] = useState("");
  const [dailyData, setDailyData] = useState([]);
  
  const [checkInModal,setCheckInModal] = useState(false)
  const [checkOutModal,setCheckOutModal] = useState(false)
  const [dayToCheck,setDayToCheck] = useState("")
  const [employeeToVerify,setEmployeeToVerify] = useState("")
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   // Connect to the Socket.IO server
  //   var socket = io.connect('http://localhost:3000');
  //   setSocket(socket);
  
  //   // Clean up socket connection when component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const handleCheckIn = (employeeId) => {
  //   if (socket) {
  //     socket.emit("check-in", employeeId);
  //   }
  // };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("check-in-success", (data) => {
  //       console.log("Check-in successful:", data);
  //       // You can update your UI or perform any other actions
  //     });
  //   }
  // }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const fetchData = async (date: string) => {
    const response = await fetch("http://localhost:3000/api/dailydetails/list", {
      body: JSON.stringify({ date }),
      method: "POST",
    });
    const data = await response.json();
    setDailyData(data.data); 
    console.log(dailyData) // Update dailyData with fetched data
  };

  const handleClick = async () => {
    await fetchData(date);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-layout">
        <input onChange={handleChange} type="date" />
        <button onClick={handleClick}>Submit</button>
      </div>
      <div className="dailydata">
      <table className="data-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {dailyData ? dailyData.map((entry) => (
                    <tr key={entry._id!=null}>
                    {/* <Link className="link-item" href={`${entry.employeeId._id}`}> */}

                    <td> <Link href={`${entry.employeeId?._id}`}>{entry.employeeId?.firstName}</Link></td>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td className={
                      entry.status === "pending"
                        ? "status-pending"
                        
                        : "status-checked-in"
                        }>
                    {entry.status}
                    </td>
                    {entry.status==="pending"?(
                        <td><button onClick={()=>{setCheckInModal(true);
                                                  setDayToCheck(entry._id)
                                                  setEmployeeToVerify(entry.employeeId._id)}}>Check in</button></td>   
                    ):(<td><button  onClick={()=>{setCheckOutModal(true)
                                                  setDayToCheck(entry._id)
                                                  setEmployeeToVerify(entry.employeeId._id)}}>Check-out</button></td>)}
              </tr>
                
              
            )):(
              <div>Loading</div>
            )}
          </tbody>
        </table>
      </div>
      {checkInModal && (
        <div className="dialog-overlay">
          <AttendanceModal date={date} status ="checked-in" dailyStatusId={dayToCheck} currentEmployeeId={employeeToVerify}/>
          <button onClick={()=>{setCheckInModal(false)}}>Close</button>

        </div>
        
      )}
      {checkOutModal && (
        <div className="dialog-overlay">
          <AttendanceModal date={date} status ="checked-out" dailyStatusId={dayToCheck} currentEmployeeId={employeeToVerify}/>
          <button onClick={()=>{setCheckOutModal(false)}}>Close</button>

        </div>
        
      )}
       
        
     
    </div>
  );
}
