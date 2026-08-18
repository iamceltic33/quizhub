import { getQuizPlease, getShaker, getSmuzi } from "@/api/sites";
import { DataView } from "./DataView";
import { getMohito } from "@/api/sites/mohito";

export async function AllQuizzes() {
    const [quizPlease, shaker, smuzi, mohito] = await Promise.all([
        getQuizPlease(),
        getShaker(),
        getSmuzi(),
        getMohito()
    ]);

    return <DataView data={{ quizPlease, shaker, smuzi, mohito }}/>
}
