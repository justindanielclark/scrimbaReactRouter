export default function isDateWithinTimePeriod(
  date: Date,
  unit: "days" | "months" | "years",
  count: number
): boolean {
  const currentDate = new Date();
  let timeDiff;

  switch (unit) {
    case "days":
      timeDiff = (currentDate.getTime() - date.getTime()) / (1000 * 3600 * 24);
      return timeDiff <= count;
    case "months":
      timeDiff =
        currentDate.getMonth() +
        1 -
        (date.getMonth() + 1) +
        (currentDate.getFullYear() - date.getFullYear()) * 12;
      return timeDiff <= count;
    case "years":
      timeDiff = currentDate.getFullYear() - date.getFullYear();
      return timeDiff <= count;
    default:
      throw new Error("Invalid unit specified");
  }
}
