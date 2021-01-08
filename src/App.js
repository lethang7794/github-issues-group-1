import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import IssueList from "./components/IssueList";
import SearchForm from "./components/SearchForm";
import NavBar from "./components/NavBar";

function App() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState(
    "https://api.github.com/repos/octocat/hello-world/issues"
  );
  // const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      let data = await fetch(url);
      let json = await data.json();
      setIssues(json);
    }
    fetchData();
  }, [url]); //url here is a dependency

  const handleClick = () => {
    setUrl(`https://api.github.com/repos/${searchTerm}/issues`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <NavBar />
      <Container>
        <h1 className="text-center title">GitHub Issues Browser</h1>
        <SearchForm
          handleChange={handleChange}
          handleClick={handleClick}
          searchTerm={searchTerm}
        />
        <IssueList issues={issues} />
      </Container>
    </div>
  );
}

export default App;
