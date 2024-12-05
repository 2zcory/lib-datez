declare namespace DateZ {
  type Operation =
    | "addHours"
    | "addDays"
    | "addMonths"
    | "format"
    | "toString"
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

  interface Fluent<T extends DateZ.Output = Date> {
    addHours: (hours: number) => Fluent<Date>;
    addDays: (days: number) => Fluent<Date>;

    addMonths: (months: number) => Fluent<Date>;
    format: (formatString: FormatString) => FluentReturnValue<string>;

    isBefore: (otherDate: InputDate) => FluentReturnValue<boolean>;
    isAfter: (otherDate: InputDate) => FluentReturnValue<boolean>;
    isToday: () => FluentReturnValue<boolean>;

    getWeek: () => FluentReturnValue<Week>;

    execute: () => T;
    toString: () => string;
    toDate: () => Date;
  }
}

export { DateZ };
