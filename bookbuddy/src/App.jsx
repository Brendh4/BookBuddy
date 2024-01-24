import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import StickyNav from 'react-sticky-nav';
import BookList from './components/BookList';
import FavoritesList from './components/FavouritesList';
import SearchBar from './components/SearchBar';
import ToReadList from './components/ToReadList';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toRead, setToRead] = useState([]);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const storedToRead = JSON.parse(localStorage.getItem('toRead')) || [];
    setFavorites(storedFavorites);
    setToRead(storedToRead);
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

  // Function to add a book to ToRead
  const addToToRead = (book) => {
    const updatedToRead = [...toRead, book];
    setToRead(updatedToRead);
    localStorage.setItem('toRead', JSON.stringify(updatedToRead));
  };

  // Function to remove a book from ToRead
  const removeFromToRead = (book) => {
    const updatedToRead = toRead.filter((item) => item.id !== book.id);
    setToRead(updatedToRead);
    localStorage.setItem('toRead', JSON.stringify(updatedToRead));
  };


  return (
    <div className="container mt-4">
      <StickyNav style={{ top: 0, zIndex: 1000 }}>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-4 text-center">
            <h1>BookBuddy</h1>
          </div>
          <div className="col-md-4 text-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </StickyNav>

      <div className="row" style={{ marginTop: '80px' }}>
        <div className="col-md-4">
          <BookList books={searchResults} onAddToFavorites={addToFavorites} />
        </div>

        <div className="col-md-4">
          <FavoritesList favorites={favorites} onRemoveFromFavorites={removeFromFavorites} />
        </div>

        <div className="col-md-4">
          <ToReadList toRead={toRead} onRemoveFromToRead={removeFromToRead} />
        </div>
      </div>
    </div>
  );
}

export default App;
