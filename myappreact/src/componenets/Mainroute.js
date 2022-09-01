import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Login from 'components/login/Login';

let Mainroute = () => {

    return (<div>
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>


    </div>)
}