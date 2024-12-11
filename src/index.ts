import datez from "./datez";

export default datez;

export namespace DateZ {
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
  export type InputDate = Date | string | number;
  export type Output = unknown;
  export type FormatString = "YYYY-MM-DD" | "YYYY-MM-DD hh:mm" | "D/M/YY";
  type Week = [number, number]; // [weekNum, year]

  export namespace Pipeline {
    export type QueueArgs<TArgs extends any[] = unknown[]> = Array<{
      operation: string;
      args: TArgs;
    }>;
  }

  export type PluginHandler = (date: Date, ...args: unknown[]) => unknown;

  export interface RegisterPlugin {
    (handler: PluginHandler, overwrite?: boolean): void;
  }

  export type PluginRegistry = Record<string, PluginHandler>;

  interface FluentReturnValue<T = unknown> {
    execute: () => T;
  }

  interface FluentRegisterPlugin extends Pick<Fluent, "register"> {}

  export interface Fluent<T extends unknown = Date> {
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
    register: (
      handler: PluginHandler,
      overwrite?: boolean,
    ) => FluentRegisterPlugin;
  }
}
