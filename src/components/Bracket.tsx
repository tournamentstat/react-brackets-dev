import React from "react";
import {SeedItem, SeedTeam, type IRenderSeedProps} from "../react-brackets";
import {RoundTitle} from "../react-brackets/components/round";
import {Seed} from "../react-brackets/brackets/Seed";
import {DoubleElimination, SingleElimination} from "../react-brackets/brackets";
import {etapData} from "./etapDataFixture";
import {DefaultSeed} from "../react-brackets/brackets/DefaultSeed/DefaultSeed"
import {Box} from "@mui/material";
import EditableTextField from "../react-brackets/brackets/DefaultSeed/EditableTextField";

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

  // const extraContestFC = <> {extraContest ? (<SeedItem style={{width: "100%"}}>
  //         <div style={{width: "100%"}}>
  //           <SeedTeam>{extraContest?.contest_members[0].id || "NO TEAM"}</SeedTeam>
  //           <SeedTeam>{extraContest?.contest_members[1].id || "NO TEAM"}</SeedTeam>
  //         </div>
  //       </SeedItem>) : <button>Add contest</button>} </>;
  return (
      <Seed {...props}>
           <DefaultSeed {...props}/>
           {
               props.seed.id === lastRoundSeeds[lastRoundSeeds.length-1].id && lastRound.final
               ?
               <Box style={{position: "absolute", left: "50%", width: "80%", transform: "translateX(-50%) translateY(300%)"}}>{<DefaultSeed {...props}/>}</Box> : null
           }
      </Seed>
  );
 }

 const RoundTitleComponent = (id: number, idx: number) => {
   const round = etapData.etap_tours.find(x=> x.id === id)
   return (
       <Box style={{height: "3em", paddingBottom: "4em"}}>
           {/*<RoundTitle>{round?.name}</RoundTitle>*/}
           <EditableTextField
              text={round?.name?? ''}
              hint={"Enter tour name"}
              fitText={false}
              sizes={{ font: 14, resize: 0, inputWidth: 250 }}
              onSave={(newName) => {}}
              style={{ width: "100%" }}
              boxProps={{ sx: {justifyContent: "center"} }}
            />
       </Box>);
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
