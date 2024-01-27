import {TextInput, Select, FileInput, Button} from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
    const [value, setValue] = useState('');
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-3xl font-bold text-center mt-2'>Create Post</h1>
        <form className='flex flex-col gap-3 mt-5'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput className='flex-1' id="title" type="text" placeholder="Title" required/>
                <Select id="category" required className='w-full sm:w-1/3'>
                   <option value="unCategorized">Select a Category</option> 
                   <option value="javaScript">Java Script</option> 
                   <option value="react">React.js</option> 
                   <option value="next">Next.js</option> 
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-2 p-4 rounded-md border-indigo-300'>
                <FileInput accept='image/*'/>
                <Button type='submit' color="indigo">Upload Image</Button>
            </div>
            <ReactQuill theme="snow" value={value} onChange={setValue}  placeholder='Write your post...'
             className='pb-4 mb-4 mt-2 h-80 'required/>
            <Button type='submit' gradientDuoTone="purpleToBlue" className='mt-5 font-bold'outline>Create Post</Button>
        </form>
    </div>
  )
}

export default CreatePost