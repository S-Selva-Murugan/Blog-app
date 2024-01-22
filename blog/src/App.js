import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import {useState} from 'react'
import Register from "./Register"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Postlist from "./Postlist"
import Mypost from "./Myposts"
import Editpost from "./Editpost"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App(){


  const [logged,setLogged] = useState(false)
  const loginToast = ()=>{
    toast("Logged in!!")
  }
  const registerToast = ()=>{
    toast("Registered successfully")
  }

  const handleLog = ()=>{
    setLogged(true)

  }

  
  return(
    <BrowserRouter>
     <div></div>
     {logged ? "": ( <div><Link to='/Login'>Login</Link>
     <Link to='/Register'>Register</Link></div>)}
    
     <Routes>
      <Route path="/Register" element={<Register toast = {registerToast}/>}></Route>
      <Route path="/Login" element={<Login toast = {loginToast} handleLog = {handleLog}/>}></Route>
      <Route path="/Postlist" element={<Postlist/>}></Route>
      <Route path="/Dashboard/*" element={<Dashboard/>}></Route>
      <Route path="/Myposts" element={<Mypost/>}></Route>
      <Route path="/Editpost/:id" element={<Editpost/>}></Route>
     </Routes>
     <ToastContainer/>
    </BrowserRouter>
    
    
  )
}