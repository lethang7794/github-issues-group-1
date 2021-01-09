import React from "react";
// import { Nav, Pagination } from "react-bootstrap";

    
const PaginationBar = ({pageNumber, setPageNumber}) => {
    const handlePageClick = (page) => {
        setPageNumber(parseInt(page))
    };
    
    const handlePage1 = () => setPageNumber(1);
    const handlePage2 = () => setPageNumber(2);
    const handlePage3 = () => setPageNumber(3);
    const handleNextPage = () => setPageNumber((p) => p + 1);
    const handlePreviousPage = () => setPageNumber((p) => p - 1);

    return (
        <nav className="justify-content-center">
            <ul class="pagination">
            <li class="page-item" onClick={handlePreviousPage}><a class="page-link" href="https://api.github.com/repos/${searchTerm}/issues?page=${setPageNumber}">Previous</a></li>
            <li class="page-item" onClick={handlePage1}><a class="page-link" href="#">1</a></li>
            <li class="page-item" onClick={handlePage2}><a class="page-link" href="#">2</a></li>
            <li class="page-item" onClick={handlePage3}><a class="page-link" href="#">3</a></li>
            <li class="page-item" onClick={handleNextPage}><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
)    
}

export default PaginationBar;