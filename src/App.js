
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Registration from './Components/Registration/Registration';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Components/Dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/Registration' element={<Registration/>}/>
       <Route path='/SignIn' element={<SignIn/>}/>
       <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route/>
     </Routes>
    </BrowserRouter>
   
  );
}

export default App;
