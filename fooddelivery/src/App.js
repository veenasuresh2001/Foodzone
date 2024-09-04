//import logo from './logo.svg';
import './App.css';
import Custlogin from './component/PROJECT/CUSTOMER/userlogin';
import Customerreg from './component/PROJECT/CUSTOMER/userreg';
//import Customerreg from './component/PROJECT/CUSTOMER/userreg';
//import Signin from './component/login';
//import Userregister from './component/register';
import Userhome from './component/PROJECT/CUSTOMER/userhome';
import { Route,Routes } from 'react-router-dom';
import Webheader from './component/webheader';
//import Userlogin from './component/login';
//import Customerreg from './component/PROJECT/CUSTOMER/userreg';
import Addproduct from './component/addproduct';
import Adminlogin from './component/PROJECT/ADMIN/adminlogin';
import Customerview from './component/PROJECT/CUSTOMER/viewcustomer';
import Profile from './component/PROJECT/CUSTOMER/userprofile';
import Adminhome from './component/PROJECT/ADMIN/adminhome';
import Useredit from './component/PROJECT/CUSTOMER/useredit';
import Home from './component/PROJECT/home';
import Hotelreg from './component/PROJECT/HOTEL/hotelreg';
import Hotellogin from './component/PROJECT/HOTEL/hotellogin';
import Hotelhome from './component/PROJECT/HOTEL/hotelhome';
import Paymentpage from './component/PROJECT/CUSTOMER/payment';
import LogoutButton from './component/PROJECT/logout';
function App() {
  return (
    <>

    
    <Routes>
      <Route path='/' element={<Webheader/>}/>
      <Route path='/register' element={<Customerreg/>}/>
      <Route path='/login' element={<Custlogin/>}/>
      <Route path='/addproduct' element={<Addproduct/>}/>
      <Route path='/adminlogin' element={<Adminlogin/>}/>
      <Route path='/userhome/*'  element={<Userhome/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/useredit' element={<Useredit/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/hotelreg' element={<Hotelreg/>}/>
      <Route path='/hotellogin' element={<Hotellogin/>}/>
      <Route path='/adminhome/*' element={<Adminhome/>}/>
      <Route path='/hotelhome/*' element={<Hotelhome/>}/>
      <Route path='/pay' element={<Paymentpage/>}/>
      <Route path='/logout' element={<LogoutButton/>}/>
    </Routes>
    </>
  );
}
export default App;
