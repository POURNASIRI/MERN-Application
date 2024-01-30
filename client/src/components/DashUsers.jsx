import { Button, Modal, Table, TableHeadCell, TableRow } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {FaTimes,FaCheck} from 'react-icons/fa'

export default function DashUsers() {

        const[allUsers,setAllUsers] = useState([])
        const{currentUser} = useSelector(state => state.user)
        const [showModal,setShowModal] = useState(false)
        const [showMore,setShowMore] = useState(false)
        const [userToBeDeleted,setUserToBeDeleted] = useState('')


        useEffect(()=>{
            const getAllUsers = async ()=>{
                try {
                    const res = await fetch(`/api/user/allusers`)
                    const data = await res.json()
                    if(res.ok){
                        setAllUsers(data.users)
                        if(data.users.length > 9){
                            setShowMore(true)
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            if(currentUser.isAdmin){
                getAllUsers()
            }
        },[currentUser._id])


       const handleShowMore = async()=>{
           const startIndex = allUsers.length
           try {
                const res = fetch(`/api/user/allusers&startIndex=${startIndex}`)
                const data = await res.json()
                if(res.ok){
                    setAllUsers([...allUsers,...data.users])
                    if(data.users.length < 9){
                        setShowMore(false)
                    }
                }
           } catch (error) {
               console.log(error)
           }
       }

        

    const handleDeleteUser = async()=>{
        setShowModal(false);
        try {
            const res = await 
            fetch(`/api/user/delete-users/${userToBeDeleted}/${currentUser._id}`,{
                method:"DELETE",
            })
            const data = await res.json()
            if(!res.ok){
                toast.error(data.message,{autoClose: 1000,position: 'top-right'})
                
            }else{
                toast.success(data.message,{autoClose: 1000,position: 'top-right'})
                setAllUsers(allUsers.filter(user => user._id !== userToBeDeleted))
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
        currentUser.isAdmin && allUsers.length > 0 ? (
          <>
          <Table hoverable className='shadow-md max-w-6xl mx-auto'>
            <Table.Head>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>user Image</TableHeadCell>
              <TableHeadCell>user Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </Table.Head>
            {
                allUsers.map(user => (
                <Table.Body key={user._id}>
                  <TableRow>
                    <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/usrs/${user._id}`}>
                        <img
                          src={user.image}
                          alt={user.title}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="text-gray-900 dark:text-gray-300 
                      font-medium capitalize" to={`/user/${user.username}`}>
                        {user.username}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell className="capitalize text-gray-900 dark:text-gray-300">
                      {!user.isAdmin ? <FaTimes className='text-red-500'/> : <FaCheck className='text-green-500'/>}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                      onClick={()=>{
                        setUserToBeDeleted(user._id);
                        setShowModal(true)}}
                      className="text-red-500">
                        Delete
                      </button>
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
              <Button onClick={handleDeleteUser} color='failure'>
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
