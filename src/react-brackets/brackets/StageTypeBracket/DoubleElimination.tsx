import {WinnersTree, LosersTree} from '../Tree';
import {TreeProps} from "../../types/SingleElimination";
import {EtapDataInterface} from "../../types/EtapData";

export function DoubleElimination(props: Omit<TreeProps, 'schema'> & {data: EtapDataInterface}) {
    const firstFinalContestId = props.data.contests.find(x => x.parentid === null)?.id ?? 0;
    const firstFinalTourIndex = props.data.etap_tours.findIndex(x => x.contests_list.includes(firstFinalContestId));
    const secondFinalContestId = props.data.contests.find(x =>
        x.parentid === null && x.id !== firstFinalContestId && !props.data.etap_tours[firstFinalTourIndex].contests_list.includes(x.id))?.id ?? 0;
    const secondFinalTourIndex = props.data.etap_tours.findIndex(x => x.contests_list.includes(secondFinalContestId));
    const winnerTreeProps = {
        ...props,
        data: {...props.data, etap_tours: props.data.etap_tours.slice(0, firstFinalTourIndex + 1)}
    };
    const loserTreeProps = {
        ...props,
        data: {
            ...props.data,
            etap_tours: props.data.etap_tours.slice(firstFinalTourIndex + 1, secondFinalTourIndex + 1)
        }
    };
    return (<div style={{textAlign: "center"}}>
            <h2>Winners tree</h2>
            <WinnersTree {...winnerTreeProps}/>
            <h2>Losers tree</h2>
            <LosersTree {...loserTreeProps}/>
        </div>
    );
}