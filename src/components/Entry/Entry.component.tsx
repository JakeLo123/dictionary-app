import { nanoid } from 'nanoid';
import styles from './Entry.module.css';

import EntryModel from 'types/Entry';

import List from './components/List';
import NymsList from './components/NymsList';

function Entry({ entry }: { entry: EntryModel }) {
  const { word, meanings } = entry;

  const meaningsId = nanoid();
  return (
    <>
      <h2>{word}</h2>
      <p className={styles.meaningsHeader} id={meaningsId}>
        Meanings
      </p>
      <ul aria-labelledby={meaningsId}>
        {meanings.map(meaning => {
          let definitionsId = nanoid();
          return (
            <li key={definitionsId}>
              <p>Part of speech: {meaning.partOfSpeech}</p>
              <p id={definitionsId}>Definitions</p>
              <List ariaLabelledby={definitionsId}>
                {meaning.definitions.map(definition => {
                  return (
                    <li key={definition.definition}>
                      <p>{definition.definition}</p>
                      {definition.example && (
                        <p>
                          Example:{' '}
                          <span className={styles.example}>
                            "{definition.example}"
                          </span>
                        </p>
                      )}
                      {definition.synonyms.length > 0 && (
                        <NymsList label="Synonyms" nyms={definition.synonyms} />
                      )}
                      {definition.antonyms.length > 0 && (
                        <NymsList label="Antonyms" nyms={definition.antonyms} />
                      )}
                    </li>
                  );
                })}
              </List>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Entry;
