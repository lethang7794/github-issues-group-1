import React from 'react';

const SearchForm = ({ handleChange, searchTerm, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className='search-form-wrapper'>
      <input
        type='text'
        onChange={handleChange}
        value={searchTerm}
        placeholder='owner/repo-name'
      />
      <button>Search</button>
    </form>
  );
};

export default SearchForm;
