interface DayBtnProps {
  date: Date;
}

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

export function DayBtn({ date }: DayBtnProps): JSX.Element {
  //   console.log(weekDays[date.getDay()]);

  return <button>{weekDays[date.getDay()]}</button>;
}
