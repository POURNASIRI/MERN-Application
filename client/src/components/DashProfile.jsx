import { Button, Modal, TextInput, } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { toast } from 'react-toastify'
import 'react-circular-progressbar/dist/styles.css';
import { deleteUserStart, deleteUserSuccess, 
  updateUserFailure, updateUserStart, 
  updateUserSuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import{HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashProfile() {


  // states
  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const {currentUser,loading} = useSelector(state => state.user)
  const [formData,setFormData] = useState({
    username:currentUser?.username,
    email:currentUser?.email,
    password:currentUser?.password
  })
  const navigate = useNavigate()
  const[showModal,setShowModal] = useState(false)

  
//for select image input by click on image we use useRef 
//and set on click event on image to get ref and click
  const FileRef = useRef()

  const dispatch = useDispatch()


// events and handlers
  useEffect(()=>{
    if(image){
      uploadImage()
    }
  },[image])

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(file){
      setImage(file)
      setImageUrl(URL.createObjectURL(file))   //this method is used to convert file into url
    }
  }



  // upload image
  const uploadImage = () => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + image.name
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(progress === 100){
        toast.success("Image uploaded successfully",{autoClose: 1000,position: 'top-right'})
      }

    },
    (error) => {
      toast.error(error.message,{autoClose: 1000,position: 'top-right'})
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageUrl(downloadURL)
        setFormData({...formData,image:imageUrl})
      })
    }
    )
  }

  // change handler
  const handleChange = async (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }


  // update profile
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
        const res = await fetch(`/api/user/update/${currentUser?._id}`, {
          method:"PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (res.ok) {
          toast.success(data.message,{autoClose: 1000,position: 'top-right'})
          dispatch(updateUserSuccess(data.rest))
        }else{
          toast.error(data.message,{autoClose: 1000,position: 'top-right'})
        }
    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error.message))
    }
  
  }


  // deleteUser
  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(data.message,{autoClose: 1000,position: 'top-right'})
        dispatch(deleteUserSuccess())
        navigate("/signin")
      }
    } catch (error) {
      console.log(error)
    }
  }



 
  return (
    <div className='max-w-lg mx-auto p-3 w-full md:mt-7'>
      <h1 className='text-center text-4xl mb-5 font-semibold'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input type="file" accept='image/*'hidden  onChange={handleImage} ref={FileRef}/>
        <div className=" relative w-32 h-32 self-center shadow-lg rounded-full">
        <img src={imageUrl ||currentUser?.image} 
        onClick={()=>FileRef.current.click()}
        className= "w-full h-full rounded-full object-cover border-8 border-[lightgray]" alt={currentUser?.name} />
        </div>
        <TextInput onChange={handleChange} id='username' type='text' defaultValue={currentUser?.username} placeholder='Username' className='my-3'/>
        <TextInput onChange={handleChange} id='email' type='email' defaultValue={currentUser?.email} placeholder='Email' className='my-3'/>
        <TextInput onChange={handleChange} id='password' type='password'placeholder='password' className='my-3'/>
        <Button 
        type='submit' gradientDuoTone={'purpleToBlue'} outline>
               {
                    loading ? <div className="flex justify-center">
                      <Spinner aria-label="Default status example" />
                      <span className="pl-3">Loading...</span>
                    </div>
                     : "Update"
                  }
        </Button>
      </form>
      <div className='flex flex-col mt-4 gap-4'>
        <Button onClick={()=>setShowModal(true)} color={"red"} >
          Delete Account
        </Button>
        <Button color={"red"} >Sign Out</Button>
      </div>
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
              <Button color='failure' onClick={deleteUser}>
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
