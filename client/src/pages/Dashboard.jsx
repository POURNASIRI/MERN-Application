import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

export default function Dashboard() {

    const location = useLocation()
    const [tab,setTabe] = useState("")
   
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl){
          setTabe(tabFromUrl)
        }
    },[location.search])


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
        {/* sidebare */}
        <div className='md:w-56'>
          <DashSidebar/>
        </div>
        {/* profile */}
        <div className='w-full'>
          {tab === "profile" && <DashProfile/>}
          
        </div>
    </div>
  )
}
