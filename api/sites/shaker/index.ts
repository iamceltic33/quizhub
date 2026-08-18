import axios from "axios";
import * as cheerio from 'cheerio';
import { type ShakerData, isGameArray } from "./shaker.types";
import type { SiteQuizInfo } from "@/types";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const QUIZ_TIME_ZONE = "Asia/Almaty";

export async function getShaker() {
    const url = 'https://karaganda.shakerquiz.ru/#games';
    const { data: html } = await axios(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
    })
    const $ = cheerio.load(html);
    const json = $('#__NEXT_DATA__').text();
    const data: ShakerData = JSON.parse(json);
    const returnData: SiteQuizInfo[] = [];
    data.props.pageProps.store.forEach((item) => {
        if (!isGameArray(item)) return;
        item[1].forEach(game => {
            if (game.status === 'Publish') {
                const date = dayjs.tz(game.event_time, QUIZ_TIME_ZONE);
                returnData.push({
                    dateTime: date.toISOString(),
                    info: game.name
                })
            }
        })
    })

    return returnData;
}
