import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import IssueList from "./components/IssueList";
import SearchForm from "./components/SearchForm";
import ErrorMessage from "./components/ErrorMessage";
import SiteNavBar from "./components/SiteNavBar";
import PaginationBar from "./components/PaginationBar";

function App() {
  const [issues, setIssues] = useState([]); //set giá trị mặc định là một array rỗng các issue
  const [searchTerm, setSearchTerm] = useState("facebook/react"); //set giá trị mặc định là rỗng 
  const [url, setUrl] = useState("https://api.github.com/repos/octocat/hello-world/issues"); //set giá trị mặc định là link

  const [isError, setIsError] = useState(false); //set giá trị mặc định là không có lỗi false 
  // Can't pass down to ErrorMessage component the whole response/result object.
  // Can only pass the error type, status, status text, url as an array.
  const [error, setError] = useState([]); // set giá trị mặc định là một array rỗng của error
  
  const [pageNumber, setPageNumber] = useState(1); 

  useEffect(() => {
    async function fetchData() {
      try {
        // Reset isError state, later if there is an error, set isError to true.
        setIsError(false);

        let response = await fetch(url);
        let result = await response.json();

        console.log(response);
        if (response.ok) {
          setIssues(result); 
        } else {
          console.log(
            'There is an error. We still receive a response from the server. But it says somethings, e.g. "Not Found!"'
          );
          setIsError(true);
          setError(["response", response.status, response.statusText]);
        }
      } catch (error) {
        setIsError(true);
        setError(["fetch"]);
        console.log(
          "There is an error. e.g. No internet. We don't receive any response from the server."
        );
      }
    }

    fetchData();
  }, [url]);
  
  //Handle url theo searchTerm mới
  const handleClick = () => {
    setUrl(`https://api.github.com/repos/${searchTerm}/issues&page=${pageNumber}&per_page=20`);
  };

  //Handle giá trị thay đổi của ô Search 
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleNextPage = (page) => {
    console.log(page)
    setPageNumber(page + 1);
  };

  return (
    <div className="App">
      <SiteNavBar />
      <Container>
        <h1 className="text-center title">GitHub Issues Browser</h1>
        <SearchForm
          handleChange={handleChange} //chạy hàm handleChange 
          handleClick={handleClick} //chạy hàm handleClick 
          searchTerm={searchTerm}
        />
        {isError && <ErrorMessage error={error} />}
        <IssueList issues={issues} />
        <PaginationBar handleNextPage={handleNextPage} pageNumber={pageNumber} />
      </Container>
    </div>
  );
}

export default App;
