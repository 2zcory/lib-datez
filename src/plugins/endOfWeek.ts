const endOfWeek: DateZ.PluginHandler = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() + (7 - day) - (day === 0 ? 7 : 0);
  date.setDate(diff);
  return date;
};

export default endOfWeek;

declare namespace DateZ {
  type PluginHandler = (date: Date, ...args: unknown[]) => unknown;

  interface Fluent<T extends unknown = Date> {
    endOfWeek: () => Fluent<T>;
  }
}
