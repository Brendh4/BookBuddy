import React from 'react';

// FavoritesList component to display favorite books
function FavoritesList({ favorites, onRemoveFromFavorites }) {
    return (
    <div>
        <h2>My Favorites</h2>
        <ul className='list-group'>
        {favorites.map((favorite) => (
            <li key={favorite.id} className='list-group-item rounded'>
            <h5>{favorite.volumeInfo.title}</h5>
              {/* Display favorite book thumbnail if available */}
            {favorite.volumeInfo.imageLinks && (
                <img
                src={favorite.volumeInfo.imageLinks.thumbnail}
                alt={favorite.volumeInfo.title}
                />
            )}
            <p>Authors: {favorite.volumeInfo.authors.join(', ')}</p>
              {/* Button to remove book from favorites */}
            <button onClick={() => onRemoveFromFavorites(favorite)} className='btn btn-danger btn-sm'>
                Remove from Favorites
            </button>
            </li>
        ))}
        </ul>
    </div>
    );
}

export default FavoritesList;