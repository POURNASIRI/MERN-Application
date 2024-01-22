import {Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SignUp() {

        // form state
        const[formData,setFormData] = useState({
          username:"",
          email:"",
          password:""
        })

        // loading state
        const[loading,setLoading] = useState(false)

        // handle change
        const handleChange = (e) => {
          setFormData({...formData,[e.target.id]:e.target.value.trim()})
        }

        // navigate
        const navigate  = useNavigate()
       
        // handle submit
        const handleSubmit = async (e) => {
          e.preventDefault()
          if(!formData.username || !formData.email || !formData.password){
            toast.error("Please fill out all fields",{autoClose: 1000,position: 'top-right'})
          }else{
            // send data
            try {
              setLoading(true)
              const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              });
              const data = await res.json();
              if(res.ok){
                toast.success(data.message,{autoClose: 1000,position: 'top-right'})
                navigate('/signin')
              }if (data.success === false){
                toast.error(data.message,{autoClose: 1000,position: 'top-right'})
              }
            } catch (error) {
              toast.error(error.message,{autoClose: 1000,position: 'top-right'})
            }finally{
              setLoading(false)
            }
          }
        }

  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl flex-col mx-auto md:flex-row items-center gap-5'>
            {/* left */}
            <div className='flex-1'>
            <div
              className='
              text-5xl font-bold dark:text-white' 
              to={"/"}>
                  <span className='px-2 py-1 bg-gradient-to-r
                  from-indigo-500 to-blue-500 text-white rounded'>E&P</span>
                  Blog 
             </div>
             <p className='dark:text-white mt-6 text-sm'>
              Enter your Email and password to sign up or you can use your  google account 
             </p>
            </div>
            {/* right */}
            <div className='flex-1 w-full'>
              {/* form */}
              <form 
              onSubmit={handleSubmit}
              className='flex flex-col gap-3  '>
                <div>
                <Label value='your Username' className='dark:text-white'/>
                <TextInput type='text'
                id='username'
                onChange={handleChange} 
                placeholder='Username'/>
                </div>
                <div>
                <Label value='your Email' className='dark:text-white'/>
                <TextInput type='email'
                id='email'
                onChange={handleChange} 
                placeholder='Ex: 0Pw5D@example.com'/>
                </div>
                <div>
                <Label value='your Password' className='dark:text-white'/>
                <TextInput type='password'
                id='password'
                onChange={handleChange}
                placeholder='Password'/>
                </div>
                <Button type='submit' gradientDuoTone={"purpleToBlue"}>
                  {
                    loading ? <div className="flex justify-center">
                      <Spinner aria-label="Default status example" />
                      <span className="pl-3">Loading...</span>
                    </div>
                     : "Sign up"
                  }
                </Button>
              </form> 
              <div className='flex gap-2 text-sm mt-3'>
                <span>Have an account?</span>
                <Link to={'/signin'} className='text-blue-500'>
                  sign In
                </Link>
              </div>
            </div>
        </div>
    </div>
  )
}
