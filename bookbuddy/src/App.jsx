import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Wrapper from './components/Wrapper';
import './App.css';

function App() {
  document.title = 'Wikipedia Searcher';
  return (
    <Wrapper>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
