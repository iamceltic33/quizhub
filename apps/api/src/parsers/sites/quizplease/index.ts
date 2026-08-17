import type { QuizPleaseApiResponse } from './quizplease.types.js';
import type { SiteQuizInfo } from "@repo/shared-types";
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

export async function getQuizPlease(): Promise<SiteQuizInfo[]> {
    const url = 'https://api.quizplease.com/api/games/schedule/80?per_page=10&order=date&relationships%5B0%5D=game_records&meta%5B%5D=places_ids&meta%5B%5D=dates&statuses%5B%5D=0&statuses%5B%5D=1&statuses%5B%5D=2&statuses%5B%5D=3&statuses%5B%5D=5';
    const { data: response }: {data: QuizPleaseApiResponse} = await axios(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
    }) 
    const data = response.data.data;
    return data.map(item => {
        const dateTime = dayjs(item.date.trim(), 'DD.MM.YYYY HH:mm').toDate();
        return {
            dateTime: dateTime.toISOString(),
            info: item.block_with_text
        }
    })
}