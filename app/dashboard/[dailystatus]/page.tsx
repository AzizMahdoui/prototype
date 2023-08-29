"use client"
import { useParams } from "next/navigation"
import { useContext } from "react"
import dailyDataContext from "../../../providers/dailyDataContext"
import DashboardLayout from "../../../components/layout/page"
export default function Dashboard(){
    const {dailyData,setDailyData} = useContext(dailyDataContext)
    // const {dailystatus} = useParams()
    // console.log(dailystatus)
    return( 
        <DashboardLayout>
                <div className="dashboard">
                        {dailyData&&(<div>{dailyData}</div>)}       
                </div>
        </DashboardLayout>
        
    )
}