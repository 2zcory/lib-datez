const getOffsetMinutes: DateZ.PluginHandler = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  const offsetMinutes = timezoneOffset % 60;

  return offsetMinutes;
};

export default getOffsetMinutes;

declare namespace DateZ {
  type PluginHandler = (date: Date, ...args: unknown[]) => unknown;

  interface FluentReturnValue<T = unknown> {
    execute: () => T;
  }

  interface Fluent<T extends unknown = number> {
    getOffsetMinutes: () => FluentReturnValue<T>;
  }
}
