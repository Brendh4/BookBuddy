import React from 'react';

const SearchResults = ({ results }) => {
    return (
        <div>
            <h2>Search Results</h2>
            {results.map((result) => (
                <div key={result.id}>
                    <p>Title: {result.volumeInfo.title}</p>
                    <p>Authors: {result.volumeInfo.authors.join(', ')}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
