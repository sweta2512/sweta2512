import Button from "react-bootstrap/Button";

const TestComponent = () => {
    let navitem = [
        {
            name: "sweta",
            Roll: 1,
            marks: 30,
        },
        {
            name: "sweta1",
            Roll: 2,
            marks: 300,
        },
        {
            name: "sweta2",
            Roll: 3,
            marks: 67,
        },
        {
            name: "sweta3",
            Roll: 4,
            marks: 90,
        },
        {
            name: "sweta4",
            Roll: 5,
            marks: 6,
        },
    ];
    return (<>
        {navitem.map((item, index) => {
            return(<ul key={index}><li { ...{ ...item, index } }>test{index}</li></ul>)   ;
            
        })

        }</>)
}
export default TestComponent;