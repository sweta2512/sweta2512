import { getUser } from "./Redux/actioncreator/action";
import axios from 'axios'

// Call API using javascript ajax.
export default function apiCall(url, allValues) {
    let allValue = allValues;
    let URL = url;
    const promise = new Promise((resolve, reject) => {
        //ajax request
        console.log(allValue)
        console.log(URL)
        let req = new XMLHttpRequest();
        //console.log(req);
        req.open("post", URL);
        req.setRequestHeader("Access-Control-Allow-Origin", "*");
        req.setRequestHeader("Content-Type", "application/json"); //'Access-Control-Allow-Origin','http://127.0.0.1:8000/api/user'

        req.onload = () => {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject("There is an Error!");
            }
        };
        req.send(JSON.stringify(allValue));
    });
    return promise;

}

///

export  async function getUserData(url){
    let URL =url;
    return await axios.get(URL)
   // return await axios.get(`https://jsonplaceholder.typicode.com/posts`)
   
}
