import { Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'

export default function DashProfile() {

  const {currentUser} = useSelector(state => state.user)
  console.log(currentUser)
  return (
    <div className='max-w-lg mx-auto p-3 w-full md:mt-7'>
      <h1 className='text-center text-4xl mb-5 font-semibold'>Profile</h1>
      <form className='flex flex-col'>
        <div  className="w-32 h-32 self-center shadow-lg rounded-full overflow-hidden">
        <img src={currentUser?.image} 
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
