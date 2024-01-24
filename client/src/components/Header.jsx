import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput} from 'flowbite-react'
import { Link ,useLocation} from 'react-router-dom'
import{AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Header() {

        // for active link
        const path = useLocation().pathname
        
        const{currentUser} = useSelector(state => state.user)
      

  return (
    <Navbar className='border-b-2'>
        <Link
        className='
        self-center whitespace-nowrap
        text-xl font-bold sm:text-3xl dark:text-white' 
        to={"/"}>
            <span className='px-2 py-1 bg-gradient-to-r
             from-indigo-500 to-blue-500 text-white rounded'>E&P</span>
            Blog 
        </Link>
        {/* search section */}
        <form>
            <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
        {/* search btn for mobiule view */}
        <Button className='w-12 h-10 lg:hidden' color='gray'>
            <AiOutlineSearch/>
        </Button>
        {/* sign in btn and check dark mode */}
        <div className='flex gap-2 md:order-2 items-center'>
        <Button className='w-12 h-10 hidden lg:inline' color='gray'>
            <FaMoon/>
        </Button>
        {
            currentUser ? (
                <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar
                    alt="User"
                    img={currentUser.image}
                    rounded
                    />
                }
                >
                    <DropdownHeader>
                        <span className="block text-sm mt-1">{currentUser.username}</span>
                        <span className="block text-sm mt-1 font-medium truncate">{currentUser.email}</span>
                    </DropdownHeader>
                    <Link to={'/dashboard?tab=profile'}>
                        <DropdownItem>
                            Profile
                        </DropdownItem>
                        <DropdownDivider/>
                        <DropdownItem>
                            Sign out
                        </DropdownItem>
                    </Link>
                </Dropdown>
            ):
            
        <Link to={'/signin'}>
            <Button
            outline 
            className='w-24 h-10' 
            gradientDuoTone={'purpleToBlue'}>Sign In</Button>
        </Link>
        }
        <NavbarToggle/>
        </div>
        {/* header links */}
        <NavbarCollapse>
            <NavbarLink active={path === '/'} as={'div'}>
                <Link to={'/'}>Home</Link>
            </NavbarLink>
            <NavbarLink active={path === '/projects'} as={'div'}>
                <Link to={'/projects'}>Projects</Link>
            </NavbarLink>
            <NavbarLink  active={path === '/about'} as={'div'}>
                <Link to={'/about'}>About</Link>
            </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  )
}
