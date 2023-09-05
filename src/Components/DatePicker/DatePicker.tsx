import { useState } from "react";
import { InputEvent } from "../../../Types/Form";
import { DayBtn } from "../DayBtn/DayBtn";

export function DatePicker(): JSX.Element {
  const [chosenDate, setChosenDate] = useState<Date>(new Date());

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

  // function handleInputChange(e: InputEvent): void {
  //     const newDate = new Date(e.target.value)
  //     setChosenDate(newDate)
  // }
  console.log(surrondingWeek[3]);
  return (
    <>
      <input
        type="date"
        value={chosenDate.toLocaleDateString()}
        onChange={(e: InputEvent) => setChosenDate(new Date(e.target.value))}
      />
      <section>
        {surrondingWeek.map((date) => (
          <DayBtn date={date} />
        ))}
      </section>
    </>
  );
}
