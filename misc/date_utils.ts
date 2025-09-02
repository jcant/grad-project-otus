export function dateToStringYYYYMMDD(date: Date): String {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
