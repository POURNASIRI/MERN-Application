import {Button, Label, TextInput} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function SignUp() {
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
            <div className='flex-1'>
              <form className='flex flex-col gap-3'>
                <div>
                <Label value='your Username' className='dark:text-white'/>
                <TextInput type='text'
                id='username' 
                placeholder='Username'/>
                </div>
                <div>
                <Label value='your Email' className='dark:text-white'/>
                <TextInput type='text'
                id='email' 
                placeholder='Ex: 0Pw5D@example.com'/>
                </div>
                <div>
                <Label value='your Password' className='dark:text-white'/>
                <TextInput type='password'
                id='password' 
                placeholder='Password'/>
                </div>
                <Button type='submit' gradientDuoTone={"purpleToBlue"}>
                  Sign up
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
