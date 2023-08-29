"use client"
import { useState } from "react";
import dailyDataContext from "../../providers/dailyDataContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState("");
  const [dailyData, setDailyData] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const fetchData = async (date: string) => {
    const response = await fetch("http://localhost:3000/api/dailydetails/list", {
      body: JSON.stringify({ date }), // Pass the date in an object
      method: "POST",
    });
    const data = await response.json();
    setDailyData(data); // Update dailyData with fetched data
  };

  const handleClick = async () => {
    // await fetchData(date); // Fetch and set the data
    setDailyData("alo alo")
  };

  return (
    <dailyDataContext.Provider value={{ dailyData, setDailyData }}>
      <div className="dashboard-layout">
        <input onChange={handleChange} type="date" />
        <button onClick={handleClick}>Submit</button>
        {children}
      </div>
    </dailyDataContext.Provider>
  );
}
