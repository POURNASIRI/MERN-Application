import React, { useEffect, useState } from 'react'
import moment from 'moment'

export default function Comment({comment}) {

    const[user,setUser] = useState({})

  

    useEffect(() => {
        async function getUser(){
            try {
                const res = await fetch(`/api/user/${comment.userId}`)
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                }
                
            } catch (error) {
                
            }
            
        }
        getUser()
         
    }, [comment])

    

  return (
    <div className='flex items-start gap-2 py-2 border-b dark:border-gray-600 '>
            <img className='w-10 h-10 rounded-full object-cover ' 
            src={user.image} alt={user.username} />
        <div>
        <div className='flex  gap-1  '>
            <span className='font-bold text-xs truncate '>
                {
                    user ? `@${user.username}` : "anonymous user"
                }
            </span>
            <span className='text-gray-500 text-xs'>
                {
                    moment(comment.createdAt).fromNow()
                }
            </span>
        </div>
            <p className='text-xs font-semibold mt-1 text-gray-500'>{comment.content}</p>
        </div>
       
    </div>
  )
}
