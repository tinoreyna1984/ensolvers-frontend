export const tzToUtc = (date = null) => {
  return (
    new Date(date).toISOString().slice(0, 10) +
    " " +
    new Date(date).toISOString().slice(11, 19)
  );
};
