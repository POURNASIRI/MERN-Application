import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Table,  TableHeadCell, TableRow} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashPosts() {

    //state
    const {currentUser} = useSelector(state => state.user)
    const [posts,setPosts] = useState([])
    const[showMore,setShowMore] = useState(false)
    const[showModal,setShowModal] = useState(false)
    const [postToBeDeleted,setPostToBeDeleted] = useState('')

  
    // get posts
    useEffect(()=>{
        const getPosts = async ()=>{
          
          try {
              const res = await fetch(`/api/post/get-posts?userId=${currentUser._id}`)
              const data = await res.json()
              if(res.ok){
                setPosts(data.posts)
                if(data.posts.length > 9){
                  setShowMore(true)
                }
              }
          } catch (error) {
            console.log(error)
          }
        }
        if(currentUser.isAdmin){
          getPosts()
        }
          
    },[currentUser._id])


    // show more btn
    const handleShowMore = async()=>{
      const startIndex = posts.length
          try {
              const res = await fetch(`/api/post/get-posts?userId=${currentUser._id}&startIndex=${startIndex}`)
              const data = await res.json()
              if(res.ok){
                setPosts((prev)=>[...prev,...data.posts])
                if(data.posts.length < 9){
                  setShowMore(false)
                }
              }
          } catch (error) {
            console.log(error)
          }
    }


    // delete post
    const handleDeletePost = async()=>{
      setShowModal(false);
          try {
            const res = await fetch(`/api/post/delete-post/${postToBeDeleted}/${currentUser._id}`,{
              method:"DELETE",
            })
            const data = await res.json()
            if(!res.ok){
              toast.error(data.message,{autoClose: 1000,position: 'top-right'})
             
            }else{
              setPosts(posts.filter(post => post._id !== postToBeDeleted))
              toast.success(data.message,{autoClose: 1000,position: 'top-right'})
            }
          } catch (error) {
            console.log(error)
          }
    }

  
  return (
    <div className='table-auto overflow-x-scroll 
    md:mx-auto p-3 scrollbar scrollbar-track-slate-100
     scrollbar-thumb-slate-300 md:overflow-hidden
     dark:scrollbar-track-slate-100'>
      {
        currentUser.isAdmin && posts.length > 0 ? (
          <>
          <Table hoverable className='shadow-md max-w-6xl mx-auto'>
            <Table.Head>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span >Edit</span>
              </TableHeadCell>
            </Table.Head>
            {
                posts.map(post => (
                <Table.Body key={post._id}>
                  <TableRow>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post._id}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-25 object-cover"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="text-gray-900 dark:text-gray-300 
                      font-medium capitalize" to={`/post/${post.slug}`}>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="capitalize text-gray-900 dark:text-gray-300">
                      {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                      onClick={()=>{
                        setPostToBeDeleted(post._id);
                        setShowModal(true)}}
                      className="text-red-500">
                        Delete
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="text-blue-500" to={`/update-post/${post._id}`}>
                        Edit
                      </Link>
                    </Table.Cell>
                  </TableRow>
                </Table.Body>
                ))}
          </Table> 
          {
            showMore && (
              <Button onClick={handleShowMore}  className='w-full self-center text-sm py-7'>
                  show more
              </Button>
            )
          }    
          </>
        ) : (
          <h1 className="text-center text-3xl">Loading...</h1>
        )
      }
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure'onClick={()=>handleDeletePost(postToBeDeleted)}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
