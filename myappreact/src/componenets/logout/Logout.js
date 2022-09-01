import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getLogout} from '../../Redux/actioncreator/auth'
import Header from '../pages/header/Header';


// function Child({handleClick}) {
//   return (
//     <div>
//       <button onClick={event => handleClick(100)}>Click</button>
//     </div>
//   );
// }

// export default function Parent() {
//   const [count, setCount] = useState(0);

//   const handleClick = num => {
//     // 👇️ take parameter passed from Child component
//     setCount(current => current + num);
//   };

//   return (
//     <div>
//       <Child handleClick={handleClick} />

//       <h2>Count: {count}</h2>
//     </div>
//   );
// }
let Logout = () => {

let dispatch = useDispatch();
let navigate = useNavigate();
let isLoggedin = useSelector((state)=>{return state.isAuthenticated});
// console.log(isLoggedin);
if(!isLoggedin){
  navigate('/');
}

  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        {/* <Header/> */}
          <button type="button" className="btn btn-danger"
            onClick={() => dispatch(getLogout())}>
            Log Out
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Logout