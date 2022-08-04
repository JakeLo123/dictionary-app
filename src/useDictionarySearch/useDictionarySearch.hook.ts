import { useMachine } from '@xstate/react';
import dictionaryMachine from './DictionaryMachine';

function useDictionarySearch() {
  const [current, send] = useMachine(dictionaryMachine);
  const { searchInput, results, errorStatus } = current.context;

  const setSearchInput = (v: string) => {
    send('SET_SEARCH_INPUT', { searchInput: v });
  };

  const doSearch = () => send('SEARCH');

  return {
    searchInput,
    setSearchInput,
    doSearch,
    results,
    hasError: current.matches('error'),
    isSearching: current.matches('searching'),
    is404: errorStatus === 404
  };
}

export default useDictionarySearch;
