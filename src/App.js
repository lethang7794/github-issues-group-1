import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import IssueList from "./components/IssueList";
import SearchForm from "./components/SearchForm";
// import PaginationBar from "./components/PaginationBar";

function App() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [url, setUrl] = useState(
    "https://api.github.com/repos/octocat/hello-world/issues"
  );
  
  useEffect(() => {
    async function fetchData() {
      let data = await fetch(url);
      let json = await data.json();
      setIssues(json);
    }
    fetchData();
  }, [url]);

  const handleClick = () => {
    setUrl(`https://api.github.com/repos/${searchTerm}/issues`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handlePageClick = (page) => {
    setPageNumber(parseInt(page));
    setUrl(`https://api.github.com/repos/${searchTerm}/issues?page=${pageNumber}`)

  }
   
  // useEffect(() => {
  // }, [pageNumber]);
  
    const handlePage1 = () => setPageNumber(1); 
    const handlePage2 = () => setPageNumber(2);
    const handlePage3 = () => setPageNumber(3);
    const handleNextPage = () => setPageNumber((p) => p + 1);
    // const handlePreviousPage = () => setPageNumber((p) => p - 1);
    
  return (
    <Container>
      <h1 className="text-center">GitHub Issues Browser</h1>
      <SearchForm
        handleChange={handleChange}
        handleClick={handleClick}
        searchTerm={searchTerm}
      />
      <IssueList issues={issues} />
      <div>
       <nav className="justify-content-center">
            <ul class="pagination">
            {/* <li class="page-item" onClick={handlePreviousPage}>Previous</li> */}
            <button class="page-item" onClick={handlePage1}>1</button>
            <button class="page-item" onClick={handlePage2}>2</button>
            <button class="page-item" onClick={handlePage3}>3</button>
            <button class="page-item" onClick={handleNextPage}>Next</button>
            </ul>
        </nav>
      </div>
    </Container>
    
  );
}

export default App;
