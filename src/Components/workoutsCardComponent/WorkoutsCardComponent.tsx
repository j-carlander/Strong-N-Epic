// import React from 'react'
import styles from "./workoutsCardComponent.module.css";

export default function WorkoutsCardComponent(): JSX.Element {
  return (
    <article className={styles.workoutsComponent}>
      <div className={styles.container}>
        <h3 className={styles.workoutsComponentHeader}>Spinning</h3>
        <p className={styles.workoutsComponentTime}>17:45 - 18:45</p>
        <p className={styles.workoutsComponentSpots}>4/20 Spots left.</p>
      </div>
      <div className={styles.container}>
        <button className={styles.workoutsComponentButton}>Book</button>
        <p className={styles.workoutsComponentCity}>
          &#x1F588; Norrtälje Centrum
        </p>
      </div>
    </article>
  );
}
