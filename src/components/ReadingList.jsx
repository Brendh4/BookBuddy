import React from 'react';

// ReadingList component
function ReadingList({ readingList, onRemoveFromReadingList }) {
    return (
    <div>
        <h2>Reading List</h2>
        <ul className='list-group'>
        {readingList.map((book) => (
            <li key={book.id} className='list-group-item rounded'>
            <h5>{book.volumeInfo.title}</h5>
            {/* Display book thumbnail if available */}
            {book.volumeInfo.imageLinks && (
                <img 
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                />
            )}
            <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
            {/* Button to remove book from Reading List */}
            <button onClick={() => onRemoveFromReadingList(book)} className='btn btn-danger btn-sm'> Remove from Reading List</button>
            </li>
        ))}
        </ul>
    </div>
    );
}

export default ReadingList;
