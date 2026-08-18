import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

const MONTHS: Record<string, string> = {
  января: "01",
  февраля: "02",
  марта: "03",
  апреля: "04",
  мая: "05",
  июня: "06",
  июля: "07",
  августа: "08",
  сентября: "09",
  октября: "10",
  ноября: "11",
  декабря: "12",
};

const TITLE_DATE_PATTERN =
  /^(\d{1,2})\s+([а-яё]+)\s+\([^)]+\)\s+(\d{1,2}:\d{2})\s*/i;

export function parseSmuziDate(title: string): Date {
  const match = title.trim().match(TITLE_DATE_PATTERN);

  if (!match) {
    throw new Error(`Cannot parse Smuzi date from title: ${title}`);
  }

  const [, day, monthName, time] = match;
  const month = MONTHS[monthName.toLowerCase()];

  if (!month) {
    throw new Error(`Unknown Smuzi month "${monthName}" in title: ${title}`);
  }

  const year = dayjs().year();
  const parsedDate = dayjs(
    `${day.padStart(2, "0")}.${month}.${year} ${time}`,
    "DD.MM.YYYY HH:mm",
    true,
  );

  if (!parsedDate.isValid()) {
    throw new Error(`Invalid Smuzi date in title: ${title}`);
  }

  return parsedDate.toDate();
}

export function removeSmuziDateFromTitle(title: string): string {
  return title.replace(TITLE_DATE_PATTERN, "").trim();
}
