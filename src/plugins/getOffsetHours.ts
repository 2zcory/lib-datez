const getOffsetHours = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.floor(timezoneOffset / -60);

  return offsetHours;
};

export default getOffsetHours;
