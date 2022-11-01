export const getDate = (time: string) => {
  const day = new Date(Number(time)).getDate();
  const hour = new Date(Number(time)).getHours();
  const min = new Date(Number(time)).getMinutes();
  return { day, hour, min };
};
