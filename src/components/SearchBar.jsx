import React, { useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <header>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search images and photos"
          autoFocus
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
