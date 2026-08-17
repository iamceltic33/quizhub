import { ApiResponse } from "@repo/shared-types";
import { DataView } from "./DataView";

export async function AllQuizzes() {
    const response = await fetch('http://localhost:5001/all');
    const {data}: {data: ApiResponse} = await response.json();
    return <DataView data={data}/>
}