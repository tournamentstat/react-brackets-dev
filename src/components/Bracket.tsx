import React from "react";
import {SeedItem, SeedTeam, type IRenderSeedProps} from "../react-brackets";
import {RoundTitle} from "../react-brackets/components/round";
import {Seed} from "../react-brackets/brackets/Seed";
import {DoubleElimination, SingleElimination} from "../react-brackets/brackets";
import {etapData} from "./etapDataFixture";

const CustomSeed = (props: IRenderSeedProps) => {
  const contest = etapData.contests.find(x=>x.id === props.seed.id);
  const lastRound = props.rounds[props.rounds.length-1];
  const lastRoundSeeds = lastRound.seeds;
  const getExtraContest = () => {
    if(contest?.parentid !== null) return null;
    const contestsEtapTour = etapData.etap_tours.find(x=> x.contests_list.includes(contest.id));
    if(!contestsEtapTour) return null;
    const extraContestId = contestsEtapTour.contests_list.length > 1 && lastRound.final && lastRound.id === contestsEtapTour.id ? contestsEtapTour.contests_list[1] : null;
    return extraContestId ? etapData.contests.find(x=>x.id === extraContestId) : null;
  }
  const extraContest = getExtraContest();

  const extraContestFC = <> {extraContest ? (<SeedItem style={{width: "100%"}}>
          <div style={{width: "100%"}}>
            <SeedTeam>{extraContest?.contest_members[0].id || "NO TEAM"}</SeedTeam>
            <SeedTeam>{extraContest?.contest_members[1].id || "NO TEAM"}</SeedTeam>
          </div>
        </SeedItem>) : <button>Add contest</button>} </>;
  return (
      <Seed {...props}>
           {props.seed.id === lastRoundSeeds[lastRoundSeeds.length-1].id && lastRound.final ? <div style={{visibility: "hidden", margin: '1em'}}>{extraContestFC}</div> : null}
        <SeedItem>
          <div>
            <SeedTeam>{contest?.contest_members[0].id || "NO TEAM"}</SeedTeam>
            <SeedTeam>{contest?.contest_members[1].id || "NO TEAM"}</SeedTeam>
          </div>
        </SeedItem>
           {props.seed.id === lastRoundSeeds[lastRoundSeeds.length-1].id && lastRound.final ? <div style={{margin: '1em', width: '100%'}}>{extraContestFC}</div> : null}
      </Seed>
  );
 }

 const RoundTitleComponent = (id: number, idx: number) => {
   const round = etapData.etap_tours.find(x=> x.id === id)
   return (<RoundTitle>{round?.name}</RoundTitle>);
 }

const Bracket = () => {
  return (
      <div style={{width: "100%", overflowX: "auto", textAlign: "center"}}>
        <h1>Double elimination bracket</h1>
        <DoubleElimination data={etapData} renderSeedComponent={CustomSeed} roundTitleComponent={RoundTitleComponent} twoSided />
      </div>
  );
}

export default Bracket;
