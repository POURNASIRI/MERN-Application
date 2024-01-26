import { Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { toast } from 'react-toastify'

export default function DashProfile() {

  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const {currentUser} = useSelector(state => state.user)
  const [imageUploadingProgress,setImageUploadingProgress] = useState(0)

    //for select image input by click on image we use useRef 
  //and set on click event on image to get ref and click
  const FileRef = useRef()

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

  const uploadImage = () => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + image.name
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if(progress){
        toast.success("Image uploaded successfully",{autoClose: 1000,position: 'top-right'})
      }

    },
    (error) => {
      console.log(error)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageUrl(downloadURL)
      })
    }
    )
  }


console.log(imageUploadingProgress)
 
  
 
  
 
  return (
    <div className='max-w-lg mx-auto p-3 w-full md:mt-7'>
      <h1 className='text-center text-4xl mb-5 font-semibold'>Profile</h1>
      <form className='flex flex-col'>
        <input type="file" accept='image/*'hidden  onChange={handleImage} ref={FileRef}/>
        <div  className="w-32 h-32 self-center shadow-lg rounded-full overflow-hidden">
        <img src={imageUrl ||currentUser?.image} 
        onClick={()=>FileRef.current.click()}
        className= "w-full h-full rounded-full object-cover border-8 border-[lightgray]" alt={currentUser?.name} />
        </div>
        <TextInput id='username' type='text' defaultValue={currentUser?.username} placeholder='Username' className='my-3'/>
        <TextInput id='email' type='email' defaultValue={currentUser?.email} placeholder='Email' className='my-3'/>
        <TextInput id='password' type='password'placeholder='password' className='my-3'/>
        <Button type='submit' gradientDuoTone={'purpleToBlue'} outline>Update</Button>
      </form>
      <div className='flex flex-col mt-4 gap-4'>
        <Button color={"red"} >Delete Account</Button>
        <Button color={"red"} >Sign Out</Button>
      </div>
    </div>
  )
}
