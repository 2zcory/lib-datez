const getOffsetMinutes = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  const offsetMinutes = timezoneOffset % 60;

  return offsetMinutes;
};

export default getOffsetMinutes;
