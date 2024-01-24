import {Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess, signInUser } from '../redux/userSlice'
import OAuth from '../components/OAuth'


export default function SignIn() {

    // state
    const[formData,setFormData] = useState({
        email:"",
        password:""
      })
      // navigate
      const navigate  = useNavigate()

      // redux state
      const dispatch = useDispatch()
      const {loading} = useSelector(state => state.user)
      
      // handle change
      const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
      }


      const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.email || !formData.password){
          toast.error("Please fill out all fields",{autoClose: 1000,position: 'top-right'})
        }else{
          // send data
          try {
            dispatch(signInUser())
            const res = await fetch('/api/auth/signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
            const data = await res.json();
            
            if(res.ok){
              toast.success(data.message,{autoClose: 1000,position: 'top-right'})
              dispatch(signInSuccess(data.user))
              navigate('/')
            }if (data.success === false){
              toast.error(data.message,{autoClose: 1000,position: 'top-right'})
            }
          } catch (error) {
            toast.error(error.message,{autoClose: 1000,position: 'top-right'})
          }
        }
      }
    return(
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
              Enter your Email and password to sign in or you can use your  google account 
             </p>
            </div>
            {/* right */}
            <div className='flex-1 w-full'>
              {/* form */}
              <form 
              onSubmit={handleSubmit}
              className='flex flex-col gap-3  '>
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
                <Button 
                disabled={loading}
                type='submit' gradientDuoTone={"purpleToBlue"}>
                  {
                    loading ? <div className="flex justify-center">
                      <Spinner aria-label="Default status example" />
                      <span className="pl-3">Loading...</span>
                    </div>
                     : "Sign In"
                  }
                </Button>
                <OAuth/>
              </form> 
              <div className='flex gap-2 text-sm mt-3'>
                <span>Don't Have an account?</span>
                <Link to={'/signup'} className='text-blue-500'>
                  sign In
                </Link>
              </div>
            </div>
        </div>
    </div>
    )
}




