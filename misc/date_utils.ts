import { sprintf } from "sprintf-js";

function dateToStringYYYYMMDD(date: Date | undefined): String | undefined {
  if (date == undefined) {
    return undefined;
  }
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return sprintf("%1$'4d-%2$'02d-%3$'02d", year, month, day);
}

function dateToString(date: Date): String {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return sprintf("%1$'02d-%2$'02d-%3$'04d", day, month, year);
}

export { dateToStringYYYYMMDD, dateToString };
