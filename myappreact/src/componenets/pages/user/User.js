import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Papa from "papaparse";

const User = () => {
    // It will store the file uploaded by the user
    const [file, setFile] = useState('');

    // It will store the csv file uploaded by the user
    const [csvfile , setCsvfile] = useState('');

     // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // This state will store the parsed data
    const [data, setData] = useState([]);
    // Allowed extensions for input file
    const allowedExtensions = ["csv"];

    //console.log(file)
    console.log(error)
    console.log(csvfile)
    const handleChange = (e) => {
        // console.log('kdfhsh')
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]))
    }


    //csv 

    const handleParse = () => {
         // If user clicks the parse button without
        // a file we show a error
        if (!csvfile) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            console.log(parsedData[0])
            
            
            const columns = Object.keys(parsedData[0]);
            console.log(columns)
            setData(columns);
        };
        reader.readAsText(csvfile);
    }



    // This function will be called when
    // the file input changes
    const handleFileChange = (e)=>{
        console.log('csv')
        //console.log(e.target.files.length);
        setError("");
        if(e.target.files.length){
            const inputFile = e.target.files[0];
             // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            console.log(inputFile);
            console.log(fileExtension);
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }
              // If input type is correct set the state
              setCsvfile(inputFile);
        }
    }
    return (
        <>
            <div>
                <h2>Add Image:</h2>
                <input type="file" onChange={handleChange} />
                <img src={file} style={{ width: '200px' }} />
            </div>
            <br/><hr/>
            <div>
                <label htmlFor="csvInput" style={{ display: "block" }}>
                    Enter CSV File
                </label>
                <input
                    onChange={handleFileChange}
                    id="csvInput"
                    name="file"
                    type="File"
                />
                <div>
                    <button onClick={handleParse}>Parse</button>
                </div>
                <div style={{ marginTop: "50px" }}>
                    {error ?<h1>{error}</h1>  : data.map((col,
                        id) => <div key={id}>{col}</div>)}
                </div>

                
            </div>


        </>
    )

}

export default User;