import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signoutUserStart, signoutUserSuccess } from '../redux/userSlice'

export default function DashSidebar() {

 
    const location = useLocation()
    const [tab,setTabe] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl){
          setTabe(tabFromUrl)
        }
    },[location.search])

    const hanbdleSignout = async()=>{
      try {
        dispatch(signoutUserStart())
        const res = await fetch("/api/user/signout",{
          method:"POST",
        })
        const data = await res.json()
        if(!res.ok){
          toast.error(data.message,{autoClose: 1000,position: 'top-right'})
        }else{
          dispatch(signoutUserSuccess())
          toast.success(data.message,{autoClose: 1000,position: 'top-right'})
          navigate('/signin')
        }

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                <Sidebar.Item
                 as='div'
                className='cursor-pointer' active={tab === "profile"}
                 icon={HiUser} label={"User"} labelColor="dark ">
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item onClick={hanbdleSignout} icon={HiArrowSmRight} className="cursor-pointer" >
                    Sing Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
