import { Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { toast } from 'react-toastify'
import 'react-circular-progressbar/dist/styles.css';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/userSlice'

export default function DashProfile() {


  // states
  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const {currentUser} = useSelector(state => state.user)
  const [formData,setFormData] = useState({})
  
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
          toast.success(data.message)
          dispatch(updateUserSuccess(data.rest))
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error.message))
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
        <Button type='submit' gradientDuoTone={'purpleToBlue'} outline>Update</Button>
      </form>
      <div className='flex flex-col mt-4 gap-4'>
        <Button color={"red"} >Delete Account</Button>
        <Button color={"red"} >Sign Out</Button>
      </div>
    </div>
  )
}
