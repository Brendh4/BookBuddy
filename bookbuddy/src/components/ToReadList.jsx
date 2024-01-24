import React from 'react';

// ToReadList component
function ToReadList({ toRead, onRemoveFromToRead }) {
    return (
    <div>
        <h2>To Read</h2>
        <ul className='list-group'>
        {toRead.map((book) => (
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
            {/* Button to remove book from ToRead */}
            <button onClick={() => onRemoveFromToRead(book)} className='btn btn-warning'>Remove from ToRead</button>
            </li>
        ))}
        </ul>
    </div>
    );
}

export default ToReadList;