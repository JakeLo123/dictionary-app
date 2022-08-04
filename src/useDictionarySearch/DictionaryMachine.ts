import { createMachine, MachineConfig, MachineOptions, assign } from 'xstate';
import axios from 'axios';
import Entry from 'types/Entry';

interface DictionaryContext {
  apiBaseUrl: 'https://api.dictionaryapi.dev/api/v2/entries/en';
  searchInput: string;
  results: Entry[];
  errorStatus?: number;
}

interface DictionarySchema {
  states: {
    idle: {};
    searching: {};
    error: {};
  };
}

type DictionaryTransitions =
  | {
      type: 'SEARCH';
    }
  | {
      type: 'SET_SEARCH_INPUT';
      searchInput: string;
    };

const config: MachineConfig<
  DictionaryContext,
  DictionarySchema,
  DictionaryTransitions
> = {
  id: 'dictionaryMachine',
  initial: 'idle',
  context: {
    results: [],
    searchInput: '',
    apiBaseUrl: 'https://api.dictionaryapi.dev/api/v2/entries/en'
  },
  states: {
    idle: {},
    searching: {
      invoke: {
        src: 'doSearch',
        onDone: {
          target: 'idle',
          actions: 'setResults'
        },
        onError: {
          target: 'error',
          actions: 'setErrorStatus'
        }
      }
    },
    error: {
      exit: assign(_ => ({ errorStatus: undefined }))
    }
  },
  on: {
    SEARCH: {
      target: 'searching',
      actions: assign(_ => ({ results: [] }))
    },
    SET_SEARCH_INPUT: {
      actions: 'setSearchInput'
    }
  }
};

const options: MachineOptions<DictionaryContext, any> = {
  actions: {
    setSearchInput: assign((_, e) => ({ searchInput: e.searchInput })),
    setResults: assign((_, e) => ({ results: e.data })),
    setErrorStatus: assign((_, e) => ({ errorStatus: e.data.response.status }))
  },
  services: {
    doSearch: ({ apiBaseUrl, searchInput }) => {
      return axios.get(apiBaseUrl + '/' + searchInput).then(res => res.data);
    }
  }
};

const dictionaryMachine = createMachine(config, options);

export default dictionaryMachine;
