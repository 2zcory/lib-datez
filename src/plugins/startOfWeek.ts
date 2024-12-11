const startOfWeek: DateZ.PluginHandler = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date;
};

export default startOfWeek;

declare namespace DateZ {
  type PluginHandler = (date: Date, ...args: unknown[]) => unknown;

  interface Fluent<T extends unknown = Date> {
    startOfWeek: () => Fluent<T>;
  }
}
