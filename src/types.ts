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

  interface FluentReturnValue<T = unknown> {
    execute: () => T;
  }

  interface Fluent {
    addHours: (hours: number) => Fluent;
    addDays: (days: number) => Fluent;
    addMonths: (months: number) => Fluent;

    format: (formatString: FormatString) => FluentReturnValue<string>;

    isBefore: (otherDate: InputDate) => FluentReturnValue<boolean>;
    isAfter: (otherDate: InputDate) => FluentReturnValue<boolean>;
    isToday: () => FluentReturnValue<boolean>;

    getWeek: () => FluentReturnValue<Week>;

    execute: <TReturnValue extends DateZ.Output = Date>() => TReturnValue;
    toString: () => string;
    toDate: () => Date;
  }
}

export { DateZ };
