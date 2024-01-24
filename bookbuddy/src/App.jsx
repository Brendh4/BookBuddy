import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import StickyNav from 'react-sticky-nav';
import BookList from './components/BookList';
import FavoritesList from './components/FavouritesList';
import SearchBar from './components/SearchBar';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

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
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Function to remove a book from favorites
  const removeFromFavorites = (book) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== book.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mt-4">
      <StickyNav>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-4 text-center">
            <h1>BookBuddy</h1>
          </div>
          <div className="col-md-4 text-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </StickyNav>

      <div className="row">
        <div className="col-md-4">
          <BookList books={searchResults} onAddToFavorites={addToFavorites} />
        </div>

        <div className="col-md-4">
          <FavoritesList favorites={favorites} onRemoveFromFavorites={removeFromFavorites} />
        </div>
      </div>
    </div>
  );
}

export default App;