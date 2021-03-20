import React from 'react';

const SearchForm = ({ handleChange, searchTerm, handleClick }) => {
  return (
    <div className='search-form-wrapper'>
      <input
        type='text'
        onChange={handleChange}
        value={searchTerm}
        placeholder='owner/repo-name'
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default SearchForm;
