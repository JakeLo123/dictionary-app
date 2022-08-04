import Phonetic from 'types/Phonetic';
import Meaning from 'types/Meaning';

type Entry = {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
};

export default Entry;
