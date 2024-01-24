import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import StickyNav from 'react-sticky-nav';
import BookList from './components/BookList';
import FavoritesList from './components/FavouritesList';
import SearchBar from './components/SearchBar';
import ReadingList from './components/ReadingList';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readingList, setReadingList] = useState([]);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const storedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
    setReadingList(storedReadingList);
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

  // Function to add a book to Reading List
  const addToReadingList = (book) => {
  const updatedReadingList = [...readingList, book];
  setReadingList(updatedReadingList);
  localStorage.setItem('readingList', JSON.stringify(updatedReadingList));
};

  // Function to remove a book from Reading List
  const removeFromReadingList = (book) => {
  const updatedReadingList = readingList.filter((item) => item.id !== book.id);
  setReadingList(updatedReadingList);
  localStorage.setItem('readingList', JSON.stringify(updatedReadingList));
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
        <BookList books={searchResults} onAddToFavorites={addToFavorites} onAddToReadingList={addToReadingList} />
        </div>

        <div className="col-md-4">
          <FavoritesList favorites={favorites} onRemoveFromFavorites={removeFromFavorites} />
        </div>

        <div className="col-md-4">
          <ReadingList readingList={readingList} onRemoveFromReadingList={removeFromReadingList} />
                </div>
      </div>
    </div>
  );
}

export default App;
