import Table from 'react-bootstrap/Table';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const Product = () => {

    return (
        <>
            <h1>hiiiiiiiiiiii</h1>
            <Popup trigger={<button> Click to open popup </button>}
                position="right center">
                <div>GeeksforGeeks</div>
                <button>Click here</button>
            </Popup>

        </>
    )

}

export default Product;