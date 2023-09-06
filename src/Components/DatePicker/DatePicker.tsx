import { useState } from "react";
import { InputEvent } from "../../../Types/Form";
import { DayBtn, NextWeekBtn, PrevWeekBtn } from "../DayBtn/DayBtns";
import styles from "./DatePicker.module.css";

export function DatePicker(): JSX.Element {
  const [chosenDate, setChosenDate] = useState<Date>(new Date()); // TODO: need to be a prop to work as a filter

  function theOtherDay(date: Date, offsetDays: number): Date {
    const time: number = date.getTime();
    const newTime: number = time + offsetDays * 86400000; // Num of days to offset * 24 hours in milliseconds
    return new Date(newTime);
  }

  const surrondingWeek: Date[] = [
    theOtherDay(chosenDate, -3),
    theOtherDay(chosenDate, -2),
    theOtherDay(chosenDate, -1),
    chosenDate,
    theOtherDay(chosenDate, 1),
    theOtherDay(chosenDate, 2),
    theOtherDay(chosenDate, 3),
  ];

  return (
    <article className={styles["datepicker-container"]}>
      <input
        type="date"
        value={chosenDate.toLocaleDateString()}
        onChange={(e: InputEvent) => setChosenDate(new Date(e.target.value))}
      />
      <section className={styles["day-btn-container"]}>
        {surrondingWeek.map((date) => (
          <DayBtn
            date={date}
            key={date.toDateString()}
            setDate={setChosenDate}
          />
        ))}
      </section>
      <section className={styles["prev-next-btn-container"]}>
        <PrevWeekBtn
          date={theOtherDay(chosenDate, -7)}
          setDate={setChosenDate}
        />
        <span>|</span>
        <NextWeekBtn
          date={theOtherDay(chosenDate, 7)}
          setDate={setChosenDate}
        />
      </section>
    </article>
  );
}
