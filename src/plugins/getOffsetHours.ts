const getOffsetHours: DateZ.PluginHandler = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.floor(timezoneOffset / -60);

  return offsetHours;
};

export default getOffsetHours;

declare namespace DateZ {
  type PluginHandler = (date: Date, ...args: unknown[]) => unknown;

  interface FluentReturnValue<T = unknown> {
    execute: () => T;
  }

  interface Fluent<T extends unknown = number> {
    getOffsetHours: () => FluentReturnValue<T>;
  }
}
