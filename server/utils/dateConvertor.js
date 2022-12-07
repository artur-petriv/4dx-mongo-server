// Convert new Date() to YYYY-MM-DD
const convertDate = (date) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;

const determineDaysBetween = (startDate, endDate) => {
  // Calculate days between start and end dates
  const differenceInTime =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  // Make array with list of days between dates
  const daysList = [];

  for (let day = 0; day <= differenceInDays; day++) {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + day);
    const convertedDate = convertDate(new Date(newDate));
    daysList.push(convertedDate);
  }

  return daysList;
};

module.exports = {
  convertDate,
  determineDaysBetween,
};
