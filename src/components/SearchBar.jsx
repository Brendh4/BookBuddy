import React, { useState } from 'react';

// SearchBar component for input and search button
function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    // Handler for search button click
    const handleSearch = () => {
    onSearch(query);
    };

    return (
    <div className='mb-3'>
        <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        />
        <button onClick={handleSearch} className='btn btn-primary mt-8'>Search</button>
    </div>
    );
}

export default SearchBar;