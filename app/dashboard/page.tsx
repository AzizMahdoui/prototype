"use client"

import { useState } from "react";
import './dashboard.css'
import Link from "next/link";

export default function Dashboard() {
  const [date, setDate] = useState("");
  const [dailyData, setDailyData] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const fetchData = async (date: string) => {
    const response = await fetch("http://localhost:3000/api/dailydetails/list", {
      body: JSON.stringify({ date }),
      method: "POST",
    });
    const data = await response.json();
    setDailyData(data.data); // Update dailyData with fetched data
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
      <button onClick={() => console.log(dailyData)}>Show Data</button>
      <div className="dailydata">
      <table className="data-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.map((entry) => (
                    <tr key={entry._id}>
                    {/* <Link className="link-item" href={`${entry.employeeId._id}`}> */}

                    <td> <Link href={`${entry.employeeId._id}`}>{entry.employeeId.firstName}</Link></td>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>{entry.status}</td>
                    {/* </Link> */}
              </tr>
                
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
