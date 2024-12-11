import datez from "./datez";

namespace DateZ {
  /** @deprecated */
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
  type Output = unknown;
  type FormatString = "YYYY-MM-DD" | "YYYY-MM-DD hh:mm" | "D/M/YY";
  type Week = [number, number]; // [weekNum, year]

  namespace Pipeline {
    type QueueArgs<TArgs extends any[] = unknown[]> = Array<{
      operation: string;
      args: TArgs;
    }>;
  }

  type PluginHandler = (date: Date, ...args: unknown[]) => unknown;

  type PluginRegistry = Record<string, PluginHandler>;

  interface FluentReturnValue<T = unknown> {
    execute: () => T;
  }

  interface Fluent<T extends unknown = Date> {
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
    register: (name: string, handler: PluginHandler) => void;
  }
}

export default DateZ;
