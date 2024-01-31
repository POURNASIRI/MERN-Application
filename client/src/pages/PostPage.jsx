import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {Button} from 'flowbite-react'

function PostPage() {

    const {postSlug} = useParams()
    const [post,setPost] = useState()
    const [loading,setLoading] = useState(false)
    const[error,setError] = useState(false)

    useEffect(()=>{
        async function getPost(){
            setLoading(true)
            try {
                const res = await fetch(`/api/post/get-posts?slug=${postSlug}`)
                const data = await res.json()
                if(!res.ok){
                    setError(true)
                    setLoading(false)
                    return
                }else{
                    setPost(data.posts[0])
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
           getPost()
    },[postSlug])


    console.log(post)

  return (
       <div className='min-h-screen' >
        {
            loading ? <p className='flex justify-center items-center text-3xl font-bold text-blue-600 h-screen 
            dark:text-white
            '>loading...</p>
            : error ? <p className='flex justify-center items-center text-3xl font-bold text-blue-600 h-screen 
            dark:text-white
            '>Something went wrong please try again</p> :
            <div className='min-h-screen flex flex-col max-w-6xl mx-auto 
             overflow-hidden'>
                <h1 className='p-3 mt-10 text-3xl text-center font-bold
                max-w-2xl mx-auto lg:text-4xl'>{post?.title}</h1>
                <Link to={`search?category=${post?.category}`} className='self-center'>
                <Button color="gray" size="xs" className='m-3 capitalize'>{post?.category}</Button>
                </Link>
                <img src={post?.image} alt={post?.title}
                className=" mt-10 p-3 max-h-[600px] w-full object-cover"/>
                <div className='p-3 text-xs font-semibold flex justify-between capitalize italic
                border-b border-slate-300 mb-10 mx-auto max-w-2xl w-full lg:w-full lg:max-w-7xl'>
                    <span>{post && new Date(post.createdAt).toDateString()}</span>
                    <span>{post&& (post.content.length /1000).toFixed(0)} mins read</span>
                </div>
            </div>
        }
       </div>
   
  )
}

export default PostPage