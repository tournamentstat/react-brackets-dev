import {Tree} from "./Tree";
import {TreeProps} from "../../types/SingleElimination";
import {EtapDataInterface} from "../../types/EtapData";
import {SchemaInterface} from "../../types/Schema";

export function LosersTree(props: Omit<TreeProps, 'schema'> & {data: EtapDataInterface}) {
    const Schema: SchemaInterface = {
        rounds: props.data.etap_tours.map(x => ({
            id: x.id,
            seeds: x.contests_list.map(contestid => ({
                id: contestid,
                parentid: props.data.contests.find(c => c.id === contestid)!.parentid
            }))
        }))
    };
    let flag = false;
    for(let i=Schema.rounds.length-2; i>=0; i--){
        Schema.rounds[i].singleLined = flag;
        flag = !flag;
    }

    return (
        <Tree schema={Schema} {...props}/>
    )
}