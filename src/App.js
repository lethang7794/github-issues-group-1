import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Container } from "react-bootstrap";
import IssueList from "./components/IssueList";
import SearchForm from "./components/SearchForm";
import ErrorMessage from "./components/ErrorMessage";
import SiteNavBar from "./components/SiteNavBar";
import IssueModal from "./components/IssueModal";
import Loader from "react-loader-spinner";

function App() {
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState(
    "https://api.github.com/repos/octocat/hello-world/issues"
  );
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
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
          setIssues([]);
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
      setIsLoading(false);
    }

    fetchData();
  }, [url]);

  const handleClick = () => {
    setUrl(`https://api.github.com/repos/${searchTerm}/issues`);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleIssueClick = (issue) => {
    console.log("Issue that was clicked ", issue);
    setSelectedIssue(issue);
    setShowModal(true);
  };

  return (
    <div className="App">
      <SiteNavBar />
      <h1 className="text-center main-title">GitHub Issues Browser</h1>
      <SearchForm
        handleChange={handleChange}
        handleClick={handleClick}
        searchTerm={searchTerm}
      />
      <Container class="col-sm-12 col-lg-9 m-sm-0">
        {isError && <ErrorMessage error={error} />}
        {isLoading ? (
          <Loader
            className="Spinner"
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        ) : (
          <IssueList issues={issues} handleIssueClick={handleIssueClick} />
        )}
      </Container>
      <IssueModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        issue={selectedIssue}
      />
    </div>
  );
}

export default App;
