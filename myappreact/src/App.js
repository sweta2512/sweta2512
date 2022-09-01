import './App.css';
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Login from './componenets/login/Login';
import Registration from './componenets/registration/Registration'
import { Dashboard } from './componenets/pages/dashboard';
import { useSelector } from "react-redux";
import ProtectedRoutes from './componenets/protectedpath';
import Product from './componenets/pages/product/Product';
import Header from './componenets/pages/header/Header';
 import UserDetail from './componenets/pages/userdetail/UserDetail';
 import TestComponent from './TestComponent'
 import User from './componenets/pages/user/User'
function App() {
  let auth = useSelector((state) => state.isAuthenticated);
  // console.log(auth)
  return (

    <>
      <BrowserRouter>

        {/* <ProtectedRoutes exact path="/" Auth={auth} element={<Dashboard />} /> */}
        <Routes>

          {/* <ProtectedRoutes exact path="/" Auth={auth} element={<Dashboard />} /> */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<Header />}>
              <Route path='/home' element={<Dashboard />} />
              <Route path='/home/product' element={<Product />} />
              <Route path='/home/testdata' element={<UserDetail />} />
              <Route path='/home/user' element={<User />} />
            </Route>
          </Route>
          

          {/* <Route path='/' element ={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} /> */}

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='test' element={<TestComponent/>}/>
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
