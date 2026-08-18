import axios from "axios";
import { type SmuziResponse } from "./smuzi.types";
import type { SiteQuizInfo } from "@/types";
import { parseSmuziDate, removeSmuziDateFromTitle } from "./helpers";

export async function getSmuzi() {
    const url = 'https://store.tildaapi.com/api/getproductslist/?storepartuid=360617813911&recid=635297893&c=1787036894178&getparts=true&getoptions=true&slice=1&size=36&flag_root=withroot';
    const { data } = await axios<SmuziResponse>(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
    })
    const returnData: SiteQuizInfo[] = [];
    data.products.forEach(item => {
        const date = parseSmuziDate(item.title);
        const quizInfo: SiteQuizInfo = {
            info: removeSmuziDateFromTitle(item.title),
            dateTime: date.toISOString(),
            additionalInfo: item.editions[0]?.["Место проведения:"],
        }
        returnData.push(quizInfo);
    })
    return returnData;
}
