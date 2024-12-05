import { DateZ } from "../types";

export const operations = {
  addHours: (date: Date, hours: number) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  },
  addDays: (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  },
  addMonths: (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  },
  format: (date: Date, formatString: DateZ.FormatString): string => {
    const newDate = new Date(date);
    const yearString = formatString.match(/y{2,4}/i)?.[0] || "";
    const monthString = formatString.match(/M{1,2}/)?.[0];
    const dayString = formatString.match(/d{1,2}/i)?.[0];
    const hourString = formatString.match(/h{1,2}/i)?.[0];
    const minuteString = formatString.match(/m{1,2}/)?.[0];

    let returnValue: string = formatString;

    if (yearString)
      returnValue = returnValue.replace(
        yearString,
        newDate
          .getFullYear()
          .toString()
          .slice(4 - yearString.length),
      );

    if (monthString)
      returnValue = returnValue.replace(
        monthString,
        (newDate.getMonth() + 1).toString().padStart(monthString.length, "0"),
      );

    if (dayString)
      returnValue = returnValue.replace(
        dayString,
        newDate.getDate().toString().padStart(dayString.length, "0"),
      );

    if (hourString)
      returnValue = returnValue.replace(
        hourString,
        newDate.getHours().toString().padStart(hourString.length, "0"),
      );

    if (minuteString)
      returnValue = returnValue.replace(
        minuteString,
        newDate.getMinutes().toString().padStart(minuteString.length, "0"),
      );

    return returnValue;
  },

  toString: (date: Date) => {
    const newDate = new Date(date);
    return newDate.toISOString();
  },

  isBefore: (date: Date, otherDate: Date | string): boolean =>
    new Date(date).getTime() < new Date(otherDate).getTime(),
  isAfter: (date: Date, otherDate: Date | string): boolean =>
    new Date(date).getTime() > new Date(otherDate).getTime(),
  isToday: (date: Date) => {
    const today = new Date();
    const thatDay = new Date(date);

    return (
      today.getFullYear() === thatDay.getFullYear() &&
      today.getMonth() === thatDay.getMonth() &&
      today.getDate() === thatDay.getDate()
    );
  },
  // TODO: move to plugin
  getWeek: (date: Date) => {
    const d = new Date(date);
    const dayNum = d.getUTCDay() || 7; // 0 is Sunday, first day of week is Monday
    const dateNum = d.getUTCDate();
    const utc = new Date(d.setUTCDate(dateNum + 4 - dayNum));
    const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1)).getTime();
    const weekNumber = Math.ceil(
      ((d.getTime() - yearStart) / 86400000 + 1) / 7,
    );

    return [weekNumber, d.getUTCFullYear()];
  },
};
