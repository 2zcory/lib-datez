declare namespace DateZ {
  type Operation =
    | "addHours"
    | "addDays"
    | "addMonths"
    | "format"
    | "isBefore"
    | "isAfter"
    | "isToday"
    | "getWeek";
  type InputDate = Date | string | number;
  type Output = Date | string | boolean | number[];
  type FormatString = "YYYY-MM-DD";
  type Week = [number, number]; // [weekNum, year]

  namespace Pipeline {
    type QueueArgs<TArgs extends any[] = unknown[]> = Array<{
      operation: Operation;
      args: TArgs;
    }>;
  }

  interface Fluent {
    addHours: (hours: number) => Fluent;
    addDays: (days: number) => Fluent;
    addMonths: (months: number) => Fluent;

    format: (formatString: FormatString) => string;

    isBefore: (otherDate: InputDate) => boolean;
    isAfter: (otherDate: InputDate) => boolean;
    isToday: () => boolean;

    getWeek: () => Week;

    execute: <TReturnValue extends DateZ.Output = Date>() => TReturnValue;
    toDate: () => Date;
    toString: () => string;
  }
}

export { DateZ };
