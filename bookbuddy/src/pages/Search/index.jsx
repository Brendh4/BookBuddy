import { useState, useEffect } from 'react';
import API from '../../utils/API';
import Container from '../../components/Container';
import SearchForm from '../../components/SearchForm';
import SearchResults from '../../components/SearchResults';
import Alert from '../../components/Alert';

function Search() {
  const [search, setSearch] = useState('Wikipedia');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }

    API.searchTerms(search)
      .then((res) => {
        if (res.data.length === 0) {
          throw new Error('No results found.');
        }
        if (res.data.status === 'error') {
          throw new Error(res.data.message);
        }
        setTitle(res.data[1][0]);
        setUrl(res.data[3][0]);
      })
      .catch((err) => setError(err));
  }, [search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Container style={{ minHeight: '100vh' }}>
        <h1 className="text-center pt-5">Search For Anything on Wikipedia</h1>
        <Alert
          type="danger"
          style={{ opacity: error ? 1 : 0, marginBottom: 10 }}
        >
          {error}
        </Alert>
        <SearchForm handleInputChange={handleInputChange} results={search} />
        <SearchResults title={title} url={url} />
      </Container>
    </div>
  );
}

export default Search;
