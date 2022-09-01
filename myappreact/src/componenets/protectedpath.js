import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({
    Auth, component: Component, ...rest }) {
    console.log('hhjghjgjhgjgjg')
    console.log(Auth)
    console.log({ ...rest })
    let isLoggedin = useSelector((state) => { return state.AuthReducer.isAuthenticated });
   //let isLoggedin = true;
    return (
        isLoggedin ? <Outlet/> : <Navigate to='/'/>
      );



}





// const Protected = ({ isLoggedIn }) => {
//     if (!isLoggedIn) {
//         return <Navigate to="/" replace />;
//     }
//    // return children;
// };
// export default Protected;