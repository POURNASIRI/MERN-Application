import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table, TableCell, TableHeadCell, TableRow } from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function DashPosts() {

    //state
    const {currentUser} = useSelector(state => state.user)
    const [posts,setPosts] = useState([])
    const[showMore,setShowMore] = useState(false)


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
                <Table.Body>
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
                      <button className="text-red-500">
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
    </div>
  )
}
