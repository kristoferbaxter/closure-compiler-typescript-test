const enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
};

function helloToday(day: Day): String {
  return `hello ${day}`;
}

export default function Hello(): String {
  return helloToday(Day.Wednesday);
}