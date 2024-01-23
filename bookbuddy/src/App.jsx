import React, { useState } from 'react';

// SearchBar component for input and search button
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  // Handler for search button click
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

// BookList component to display search results
function BookList({ books, onAddToFavorites }) {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
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
            <button onClick={() => onAddToFavorites(book)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// FavoritesList component to display favorite books
function FavoritesList({ favorites, onRemoveFromFavorites }) {
  return (
    <div>
      <h2>My Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <h3>{favorite.volumeInfo.title}</h3>
            {/* Display favorite book thumbnail if available */}
            {favorite.volumeInfo.imageLinks && (
              <img
                src={favorite.volumeInfo.imageLinks.thumbnail}
                alt={favorite.volumeInfo.title}
              />
            )}
            <p>Authors: {favorite.volumeInfo.authors.join(', ')}</p>
            {/* Button to remove book from favorites */}
            <button onClick={() => onRemoveFromFavorites(favorite)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// App component, the main application component
function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Handler for search functionality
  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to add a book to favorites
  const addToFavorites = (book) => {
    setFavorites((prevFavorites) => [...prevFavorites, book]);
  };

  // Function to remove a book from favorites
  const removeFromFavorites = (book) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== book.id)
    );
  };

  return (
    <div>
      <h1>BookBuddy</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={searchResults} onAddToFavorites={addToFavorites} />
      <FavoritesList favorites={favorites} onRemoveFromFavorites={removeFromFavorites} />
    </div>
  );
}

export default App;
