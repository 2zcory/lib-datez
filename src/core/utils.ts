import { DateZ } from "../types";

export const parseDate = (input?: DateZ.InputDate): Date => {
  const date = input ? new Date(input) : new Date();

  if (isNaN(date.getTime())) throw new Error("Invalid date input");

  return date;
};
