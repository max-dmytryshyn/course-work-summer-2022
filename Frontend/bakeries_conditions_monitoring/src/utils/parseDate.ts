export const parseDate = (date: string) => {
  const dateParsed = new Date(date);
  return {
    date: dateParsed.toLocaleDateString(),
    time: dateParsed.toLocaleTimeString()
  };
};
