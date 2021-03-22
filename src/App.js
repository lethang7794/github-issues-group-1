import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Container } from 'react-bootstrap';
import IssueList from './components/IssueList';
import SearchForm from './components/SearchForm';
import ErrorMessage from './components/ErrorMessage';
import SiteNavBar from './components/SiteNavBar';
import IssueModal from './components/IssueModal';
import Loader from 'react-loader-spinner';
import PaginationItem from './components/PaginationItem';

function App() {
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState({});

  let initialSearchTerm;
  if (localStorage.getItem('searchTerm')) {
    initialSearchTerm = localStorage.getItem('searchTerm');
  } else {
    initialSearchTerm = 'facebook/react';
  }

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(null);

  const [url, setUrl] = useState(
    `https://api.github.com/repos/${initialSearchTerm}/issues?page=${pageNum}`
  );
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm, pageNum]);

  useEffect(() => {
    let searchTerm = localStorage.getItem('searchTerm');
    setUrl(`https://api.github.com/repos/${searchTerm}/issues?page=${pageNum}`);
  }, [pageNum]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError(false);

        let response = await fetch(url);
        let result = await response.json();
        console.log(response);

        if (response.ok) {
          let headersLink = response.headers.get('Link');
          let lastPageRegEx = /\d+(?=>; rel="last")/g;
          let lastPageMatch = headersLink.match(lastPageRegEx);
          console.log(lastPageMatch);

          if (lastPageMatch.length > 0) {
            let lastPage = lastPageMatch[0];
            setTotalPageNum(lastPage);
          }

          setTimeout(() => {
            setIssues(result);
            setIsLoading(false);
          }, 500);
        } else {
          console.log('Error in response');
          setIssues([]);
          setIsError(true);
          setIsLoading(false);

          if (response.status === 404) {
            setError([
              'response',
              response.status,
              `Repo ${searchTerm} not found!`,
            ]);
            return;
          }

          setError(['response', response.status, result.message]);
        }
      } catch (error) {
        console.log('Error in fetch');
        setIsError(true);
        setError(['fetch']);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tidy up the searchTerm: remove http://github.com at the beginning and the slash at the end.
    let newSearchTerm = searchTerm.replaceAll(
      /^https:\/\/github\.com\/|\/$/g,
      ''
    );

    setSearchTerm(newSearchTerm);
    setPageNum(1);
    setUrl(`https://api.github.com/repos/${searchTerm}/issues?page=${pageNum}`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleIssueClick = (issue) => {
    console.log('Issue that was clicked ', issue);
    setSelectedIssue(issue);
    setShowModal(true);
  };

  return (
    <div className='App'>
      <SiteNavBar />
      <h1 className='text-center main-title'>GitHub Issues Browser</h1>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
      />
      <Container className='col-sm-12 col-lg-9'>
        {isError && <ErrorMessage error={error} />}
        {isLoading && !isError ? (
          <Loader
            className='Spinner'
            type='Oval'
            color='#00BFFF'
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        ) : (
          <>
            <IssueList issues={issues} handleIssueClick={handleIssueClick} />
            {!!totalPageNum && totalPageNum > 1 && (
              <PaginationItem
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPageNum}
                loading={isLoading}
              />
            )}
          </>
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
