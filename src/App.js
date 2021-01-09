import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import IssueList from "./components/IssueList";
import SearchForm from "./components/SearchForm";

function App() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState(
    "https://api.github.com/repos/octocat/hello-world/issues"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(url);
        let result = await response.json();

        if (response.ok) {
          setIssues(result);
        } else {
          console.log(
            'There is an error. We still receive a response from the server. But it says: "Not Found!" ...'
          );
        }
      } catch (error) {
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
    <Container>
      <h1 className="text-center">GitHub Issues Browser</h1>
      <SearchForm
        handleChange={handleChange}
        handleClick={handleClick}
        searchTerm={searchTerm}
      />
      <IssueList issues={issues} />
    </Container>
  );
}

export default App;
