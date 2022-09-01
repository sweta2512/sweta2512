import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getUser } from '../../../Redux/actioncreator/action';
import '../../registration/style.css'
import { getUserData } from '../../../Helper'
import Services from '../../../Services'
import Pagination from '../../sharedcomponent/Pagination'

let UserDetail = () => {
    let [page, setPage] = useState({
        offset: 0,
        data: [],
        perPage: 10,
        pageCount: 10,
        currentPage: 0
    })
   // console.log(page)
    let dispatch = useDispatch();
    let data = useSelector((state) => state.GetuserReducer.user);
    //get 10 data per page
    const slice = data.slice(page.offset, page.offset + page.perPage)
    //console.log(slice) 
    // console.log(data);
    let totalPage = data.length / page.perPage;
    //alert(totalPage)

    useEffect(() => {

        getUserData(Services.GET_TEST_USER_API).then((response) => {
            //console.log(response.data)
            dispatch(getUser(response.data));
            //console.log(data);
        }).catch((error) => {
            console.log(error)
        })

    }, [dispatch])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * page.perPage;
        setPage({
            ...page,
            currentPage: selectedPage,
            offset: offset,
            pageCount: totalPage
        })
    }

    return (<>
        <h1>user detail</h1>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.length===0 && <span>Loading.....</span>}
                {data.length !== 0 && slice.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    )
                })}

                {/* <Pagination  data={data}/> */}
            </tbody>
        </Table>
        <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            activeClassName={"active"}
            pageCount={page.pageCount}
            onPageChange={handlePageClick} />

    </>);


}
export default UserDetail;