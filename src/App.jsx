import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import DessertOrders from './components/DessertOrders'
import Login from './components/Login'
import Mission from './components/Mission'
import Orders from './components/Orders'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import Logout from './components/Logout'

function App() {
  return (
   <>

 <BrowserRouter>  
   <NavBar/>
<Routes> 
<Route path='/' element={<Home/>}/>
<Route path='/register' element={<SignUp/>}/>
<Route path='/signin' element={<Login/>}/>
<Route path='/mission' element={<Mission/>}/>
<Route path='/orders' element={<Orders/>}/>
<Route path='/dessertorders' element={<DessertOrders/>}/>
<Route path='/logout' element={<Logout/>}/>

 </Routes>
  </BrowserRouter>

   </>


  )
}

export default App

