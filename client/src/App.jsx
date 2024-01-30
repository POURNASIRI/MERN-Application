import {Route,Routes} from 'react-router-dom'
import {Home,Projects,About,SignIn,SignUp, Header, FooterCom, Dashboard, PrivateRoute} from './index.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './pages/CreatePost.jsx';
import OnlyAdminPriviteRoute from './components/OnlyAdminPriviteRoute.jsx';
import UpdatePost from './pages/UpdatePost.jsx';


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/about' element={<About/>}/>
        <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route element={<OnlyAdminPriviteRoute/>}>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost/>}/>
        </Route>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
        <ToastContainer />
      <FooterCom/>
    </div>
  )
}

export default App