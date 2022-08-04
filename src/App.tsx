import { SyntheticEvent } from 'react';

import './normalize.css';
import './App.css';

import useDictionarySearch from './useDictionarySearch';

import Entry from './components/Entry';
import List from './components/Entry/components/List';

function App() {
  const {
    searchInput,
    setSearchInput,
    doSearch,
    is404,
    results,
    hasError,
    isSearching
  } = useDictionarySearch();

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    doSearch();
  };

  return (
    <div className="root-container">
      <h1>The Dictionary</h1>
      <form onSubmit={handleSearch}>
        <label className="search-input" htmlFor="search-input">
          Get me the definition for
        </label>
        <input
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="search-input"
          id="search-input"
        />
        <button>Go!</button>
        <div className="feedback-section" aria-live="assertive">
          {isSearching && <h2>One moment.</h2>}
          {hasError && (
            <h2>
              {is404
                ? 'No definitions found for that word.'
                : 'Something went wrong, please try again.'}
            </h2>
          )}
          {results.length > 0 && (
            <>
              <h2 id="entries-list">Entries</h2>
              <List ariaLabelledby="entries-list">
                {results.map(entry => (
                  <Entry entry={entry} />
                ))}
              </List>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
