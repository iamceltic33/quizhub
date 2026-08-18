import { getQuizPlease, getShaker, getSmuzi } from "@/api/sites";
import { DataView } from "./DataView";

export async function AllQuizzes() {
    const [quizPlease, shaker, smuzi] = await Promise.all([
        getQuizPlease(),
        getShaker(),
        getSmuzi(),
    ]);

    return <DataView data={{ quizPlease, shaker, smuzi }}/>
}
