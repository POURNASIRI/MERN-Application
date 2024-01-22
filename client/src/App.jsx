import {Route,Routes} from 'react-router-dom'
import {Home,Projects,About,SignIn,SignUp, Header, FooterCom} from './index.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
        <ToastContainer />
      <FooterCom/>
    </div>
  )
}

export default App