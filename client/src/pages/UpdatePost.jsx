import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {TextInput, Select, FileInput, Button, Spinner} from 'flowbite-react'
import {  useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { app } from '../firebase';
import { useNavigate, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'

function UpdatePost() {

    //states
    const[file,setFile] = useState(null)
    const[formData,setFormData] = useState({})
    const[uploadImageLoading,setUploadImageLoading] = useState(false)
    const navigate = useNavigate()
    const {postId} = useParams()
    const {currentUser} = useSelector((state)=>state.user)
    const[loading,setLoading] = useState(false)
   


    useEffect(()=>{
        const fetchPost = async ()=>{
            setLoading(true)
            try {
                const res = await fetch(`/api/post/get-posts?postId=${postId}`)
                const data = await res.json()
                if(!res.ok){
                    toast.error(data.message,{autoClose: 1000,position: 'top-right'})
                    return
                }else{
                    setLoading(false)
                    setFormData(data.posts[0])
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    },[postId])

    if(loading){
        return <div className='h-screen flex justify-center items-center'>
                <h1>Loading...</h1>
        </div>
    }

    // upload post image
    const handleUploadImage = async ()=>{
        setUploadImageLoading(true)
        try {
            if(!file){
                toast.error("Please select image",{autoClose: 1000,position: 'top-right'})
                setUploadImageLoading(false)
                return;
            }else{
                const storage = getStorage(app)
                const filename = new Date().getTime() + file.name
                const Storageref = ref(storage, filename)
                const uploadTask = uploadBytesResumable(Storageref,file)
                uploadTask.on('state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress === 100){
                        setUploadImageLoading(false)
                        toast.success("Image uploaded successfully",{autoClose: 1000,position: 'top-right'})
                    }
                },
                (error)=>{
                    toast.error(error.message,{autoClose: 1000,position: 'top-right'})
                    setUploadImageLoading(false)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setFormData({...formData,image:downloadURL})
                    })
                }
                )
            }
        } catch (error) {
            toast.error("image upload failed",{autoClose: 1000,position: 'top-right'})
            console.log(error)
        }
    }
    

   
    //publish post
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await fetch(`/api/post/update-post/${formData._id}/${currentUser._id}`,{
                method:"PUT",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            console.log(data)
            if(res.ok){
                toast.success(data.message,{autoClose: 1000,position: 'top-right'})
                navigate(`/post/${data.post.slug}`)
            }else{
                toast.error(data.message,{autoClose: 1000,position: 'top-right'})
            }
        } catch (error) {
            toast.error("Something went wrong please try again",{autoClose: 1000,position: 'top-right'})
            console.log(error)
        }
    }
    

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-3xl font-bold text-center mt-2'>Update Post</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput  onChange={(e)=>setFormData({...formData,title:e.target.value})}
                value={formData.title} 
                className='flex-1' 
                id="title" type="text" placeholder="Title" required/>
                <Select onChange={(e)=>setFormData({...formData,category:e.target.value})}
                value={formData.category}  
                id="category" required className='w-full sm:w-1/3'>
                   <option value="unCategorized">Select a Category</option> 
                   <option value="javaScript">Java Script</option> 
                   <option value="react">React.js</option> 
                   <option value="next">Next.js</option> 
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-2 p-4 rounded-md border-indigo-300'>
                <FileInput  accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                <Button onClick={handleUploadImage} type='button' color="indigo">
                    {
                        uploadImageLoading ? <div>
                            <Spinner aria-label="Spinner button example" size="sm" />
                            <span className="pl-3">Loading...</span>
                        </div> : "Upload Image"
                    }
                </Button>
            </div>
            {
                formData.image && <img className='w-full h-80 object-cover' src={formData.image} alt=""/>
            }
            <ReactQuill  theme="snow" value={formData.content}  onChange={(value)=>setFormData({...formData,content:value})}  placeholder='Write your post...'
             className='pb-4 mb-4 mt-2 h-80 'required/>
            <Button type='submit' gradientDuoTone="purpleToBlue" className='mt-5 font-bold'outline>Update Post</Button>
        </form>
    </div>
  )
}

export default UpdatePost