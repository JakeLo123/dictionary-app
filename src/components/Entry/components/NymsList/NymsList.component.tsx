import { nanoid } from 'nanoid';
import styles from './NymsList.module.css';
import List from '../List';

function NymsList({ label, nyms }: { label: string; nyms: string[] }) {
  const id = nanoid();
  return (
    <div className={styles.root}>
      <p id={id}>{label}:</p>
      <List ariaLabelledby={id} className={styles.list}>
        {nyms.map((antonym: string) => {
          return <li key={antonym}>{antonym}</li>;
        })}
      </List>
    </div>
  );
}

export default NymsList;
