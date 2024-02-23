import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button, Textarea} from 'flowbite-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function CommentSection({postId}) {

    const{currentUser} = useSelector(state => state.user)
    const[comment,setComment] = useState("")
    const[comments,setComments] = useState([])

   

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(comment.length > 200){
            return
        }
        try {
            const res = await fetch(`/api/comment/create-comment/`,{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    content:comment,
                    postId,
                    userId:currentUser._id
                })
            }) 
            const data = await res.json()
            if(res.ok){
                setComment("")
                toast.success(data.message,{autoClose: 1000,position: 'top-right'})
            }else{
                toast.error("Something went wrong",{autoClose: 1000,position: 'top-right'})
            }  
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
      const getComments = async()=>{
        try {
            const res = await fetch(`/api/comment/getPostComments/${postId}`)
            const data = await res.json()
            setComments(data)
        } catch (error) {
            toast.error(error.message,{autoClose: 1000,position: 'top-right'})
        }
      
      }
    
      getComments()
    }, [postId])
     
  
  return (
    <div
    className='p-3 max-w-6xl w-full mx-auto'>
        {
            currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <img className='h-10 w-10 rounded-full object-cover border border-3 border-gray-400 ' src={currentUser.image} alt={currentUser.username} />
                    <Link className='hover:underline text-cyan-600 capitalize italic' to={`/dashboard?tab=profile`}>
                        @{currentUser.username}
                    </Link>
                </div>
            ):
            (
                <div className='text-sm text-teal-500 my-5 text-center '>
                    You must be signed in to comment.
                <Link className='hover:underline text-blue-600 font-bold capitalize italic' to={"/signin"}>
                    Sign In
                </Link>
                </div>
            )
        }
        {
            currentUser &&(
                <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea
                    placeholder='Add a comment...'
                    rows={3}
                    maxLength={200}
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    />
                    <div className='flex justify-between items-center mt-3'>
                        <p className='text-xs text-gray-500'>{200 - comment.length} Characters remaining</p>
                        <Button
                        type='submit' 
                        gradientDuoTone="purpleToBlue" size="md">
                            Submit
                        </Button>
                    </div>
                </form>
               
            )
        }
         {
                    comments.length === 0 ? (
                        <p className='text-gray-500 font-bold text-xs mt-2'>No comments yet!</p>
                    ):(
                        <>
                        <div className='flex gap-2 text-gray-500 font-bold text-xs mt-2 items-center'>
                            <p>Comments</p>
                            <div className='border border-teal-500 px-2 py-1 rounded '>
                                <p>{comments.length}</p>
                            </div>
                        </div>
                        </>
                    )
                }
    </div>
  )
}

export default CommentSection