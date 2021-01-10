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
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState(
    "https://api.github.com/repos/octocat/hello-world/issues"
  );

  const [isError, setIsError] = useState(false);
  // Can't pass down to ErrorMessage component the whole response/result object.
  // Can only pass the error type, status, status text, url as an array.
  const [error, setError] = useState([]);

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

  const handleClick = () => {
    setUrl(`https://api.github.com/repos/${searchTerm}/issues`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <SiteNavBar />
      <Container>
        <div className="fixed">
          <h1 className="text-center main-title">GitHub Issues Browser</h1>
          <SearchForm
            handleChange={handleChange}
            handleClick={handleClick}
            searchTerm={searchTerm}
          />
        </div>
        {isError && <ErrorMessage error={error} />}
        <IssueList issues={issues} />
      </Container>
    </div>
  );
}

export default App;
