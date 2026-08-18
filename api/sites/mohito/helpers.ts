import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const QUIZ_TIME_ZONE = "Asia/Almaty";

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
  /^(\d{1,2})\s+([а-яё]+)\s+[а-яё]{2}\s+(\d{1,2}:\d{2})\s*/i;

export function parseMohitoDate(title: string): Date {
  const match = title.trim().match(TITLE_DATE_PATTERN);

  if (!match) {
    throw new Error(`Cannot parse Mohito date from title: ${title}`);
  }

  const [, day, monthName, time] = match;
  const month = MONTHS[monthName.toLowerCase()];

  if (!month) {
    throw new Error(`Unknown Mohito month "${monthName}" in title: ${title}`);
  }

  const year = dayjs().tz(QUIZ_TIME_ZONE).year();
  const parsedDate = dayjs.tz(
    `${day.padStart(2, "0")}.${month}.${year} ${time}`,
    "DD.MM.YYYY HH:mm",
    QUIZ_TIME_ZONE,
  );

  if (!parsedDate.isValid()) {
    throw new Error(`Invalid Mohito date in title: ${title}`);
  }

  return parsedDate.toDate();
}

export function removeMohitoDateFromTitle(title: string): string {
  return title.replace(TITLE_DATE_PATTERN, "").trim();
}
