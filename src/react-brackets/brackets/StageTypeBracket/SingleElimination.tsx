import {TreeProps} from "../../types/SingleElimination";
import {EtapDataInterface} from "../../types/EtapData";
import {WinnersTree} from "../Tree";

export function SingleElimination(props: Omit<TreeProps, 'schema'> & {data: EtapDataInterface}) {
    const firstFinalContestId = props.data.contests.find(x=> x.parentid === null)?.id ?? 0;
    const firstFinalTourIndex = props.data.etap_tours.findIndex(x=> x.contests_list.includes(firstFinalContestId));
    props.data.etap_tours = props.data.etap_tours.slice(0, firstFinalTourIndex+1);
    return (
        <WinnersTree {...props}/>
    );
}