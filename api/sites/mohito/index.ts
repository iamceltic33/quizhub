import axios from "axios";
import { type MohitoQuizStoreResponse } from "../tilda.types";
import type { SiteQuizInfo } from "@/types";
import { parseMohitoDate, removeMohitoDateFromTitle } from "./helpers";

export async function getMohito() {
    const url = 'https://store.tildaapi.com/api/getproductslist/?storepartuid=708351174852&recid=2253390781&c=1787049048957&getparts=true&getoptions=true&slice=1&size=36&flag_root=withroot';
    const { data } = await axios<MohitoQuizStoreResponse>(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
    })
    const returnData: SiteQuizInfo[] = [];
    data.products.forEach(item => {
        const date = parseMohitoDate(item.title);
        const quizInfo: SiteQuizInfo = {
            info: removeMohitoDateFromTitle(item.title),
            dateTime: date.toISOString(),
            additionalInfo: item.editions[0]?.["Место проведения:"],
        }
        returnData.push(quizInfo);
    })
    return returnData;
}
