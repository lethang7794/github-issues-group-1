import { Pagination } from "react-bootstrap";

const PaginationBar = ({ handleNextPage, pageNumber }) => {
    return (
        <div> 
            <Pagination>
                <nav aria-label="Page navigation">
                    <ul class="pagination pagination-sm justify-content-center">
                        <button class="page-item active" onClick={() => handleNextPage(pageNumber)}> Next </button>
                        {/* <button class="page-item active" onClick={handleNextPage}> Next </button> */}
                    </ul>
                </nav>
            </Pagination>
        </div>
    )
};

export default PaginationBar;