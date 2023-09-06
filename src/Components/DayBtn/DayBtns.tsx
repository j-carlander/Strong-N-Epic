import styles from "./DayBtns.module.css";

interface DayBtnProps {
  date: Date;
  setDate: (a: Date) => void;
}

const weekDayShorts = ["S", "M", "T", "W", "T", "F", "S"];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function DayBtn({ date, setDate }: DayBtnProps): JSX.Element {
  //   console.log(weekDays[date.getDay()]);

  return (
    <button
      className={styles["day-btn"]}
      onClick={() => setDate(date)}
      disabled={date < new Date(new Date().setHours(0, 0, 0, 0))}>
      <div className={styles["day-container"]}>
        <p className={styles.date}>{date.getDate()}</p>
        <p className={styles.day}>{weekDayShorts[date.getDay()]}</p>
      </div>
    </button>
  );
}

export function NextWeekBtn({ date, setDate }: DayBtnProps): JSX.Element {
  return (
    <button onClick={() => setDate(date)} className={styles["week-btn"]}>
      Next {weekDays[date.getDay()]} &#129054;
    </button>
  );
}

export function PrevWeekBtn({ date, setDate }: DayBtnProps): JSX.Element {
  return (
    <button
      className={styles["week-btn"]}
      onClick={() => setDate(date)}
      disabled={date < new Date(new Date().setHours(0, 0, 0, 0))}>
      &#129052; Prev {weekDays[date.getDay()]}
    </button>
  );
}
