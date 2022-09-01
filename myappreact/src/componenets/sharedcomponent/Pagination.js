import React, { useState } from 'react'
const Pagination = (props) => {

    const [pages, setPages] = useState()
    const [currentPage, setCurrentPage] = useState('1')
   console.log('pagination.........................',props.data)

    function goToNextPage() {

    }

    function goToPreviousPage() {

    }

    function changePage(event) {

    }

    const getPaginatedData = () => {

    };

    const getPaginationGroup = () => {

    };

    return (
        <>
            <h1>Pagination</h1>

        </>
    )

}

export default Pagination;