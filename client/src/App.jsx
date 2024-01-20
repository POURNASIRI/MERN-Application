import {Route,Routes} from 'react-router-dom'
import {Home,Projects,About,SignIn,SignUp} from './index.js'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
  )
}

export default App