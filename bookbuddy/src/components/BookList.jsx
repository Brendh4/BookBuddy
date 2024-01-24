import React from 'react';

// BookList component to display search results
function BookList({ books, onAddToFavorites, onAddToReadingList }) {
    return (
    <div>
        <h2>Search Results</h2>
        <ul className='list-group'>
            {books.map((book) => (
            <li key={book.id} className='list-group-item'>
                <h3>{book.volumeInfo.title}</h3>
                {/* Display book thumbnail if available */}
                {book.volumeInfo.imageLinks && (
                <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                />
            )}
            <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
            {/* Button to add book to favorites */}
            <button onClick={() => onAddToFavorites(book)} className='btn btn-success'>Add to Favorites</button>
            {/* Button to add book to Reading List */}
            <button onClick={() => onAddToReadingList(book)} className='btn btn-success'>Add to Reading List</button>
            </li>
        ))}
        </ul>
    </div>
    );
}

export default BookList;