import { getQuizPlease, getShaker, getSmuzi } from "@/api/sites";
import { DataView, type ViewMode } from "./DataView";
import { getMohito } from "@/api/sites/mohito";

export async function AllQuizzes(props: { initialViewMode: ViewMode }) {
    const [quizPlease, shaker, smuzi, mohito] = await Promise.all([
        getQuizPlease(),
        getShaker(),
        getSmuzi(),
        getMohito()
    ]);

    return (
        <DataView
            data={{ quizPlease, shaker, smuzi, mohito }}
            initialViewMode={props.initialViewMode}
        />
    )
}
