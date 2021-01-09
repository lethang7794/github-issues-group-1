import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import IssueList from "./components/IssueList";
import SearchForm from "./components/SearchForm";
import ErrorMessage from "./components/ErrorMessage";
import SiteNavBar from "./components/SiteNavBar";

function App() {
  const [issues, setIssues] = useState([]);

  let initialSearchTerm;
  if (localStorage.getItem("searchTerm")) {
    initialSearchTerm = localStorage.getItem("searchTerm");
  } else {
    initialSearchTerm = "octocat/hello-world";
  }

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [url, setUrl] = useState(
    `https://api.github.com/repos/${initialSearchTerm}/issues`
  );

  const [isError, setIsError] = useState(false);
  // Can't pass down to ErrorMessage component the whole response/result object.
  // Can only pass the error type, status, status text, url as an array.
  const [error, setError] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Show loading Spinner when beginning fetching
        setIsLoading(true);

        // Reset isError state, later if there is an error, set isError to true.
        setIsError(false);

        let response = await fetch(url);
        let result = await response.json();
        console.log(response);

        if (response.ok) {
          setIssues(result);
        } else {
          console.log("Error in response");
          setIssues([]);
          setIsError(true);
          setError(["response", response.status, response.statusText]);
        }
      } catch (error) {
        console.log("Error in fetch");
        setIsError(true);
        setError(["fetch"]);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [url]);

  const handleClick = () => {
    // Tidy up the searchTerm: remove http://github.com at the beginning and the slash at the end.
    let newSearchTerm = searchTerm.replaceAll(
      /^https:\/\/github\.com\/|\/$/g,
      ""
    );

    setSearchTerm(newSearchTerm);
    setUrl(`https://api.github.com/repos/${newSearchTerm}/issues`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <SiteNavBar />
      <Container>
        <h1 className="text-center title">GitHub Issues Browser</h1>
        <SearchForm
          handleChange={handleChange}
          handleClick={handleClick}
          searchTerm={searchTerm}
        />
        {isError && <ErrorMessage error={error} />}

        {isLoading ? <div>Loading</div> : <IssueList issues={issues} />}
      </Container>
    </div>
  );
}

export default App;
