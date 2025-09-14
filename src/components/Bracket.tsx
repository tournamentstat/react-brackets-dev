import React from "react";
import {SeedItem, SeedTeam, type IRenderSeedProps} from "../react-brackets";
import {RoundTitle} from "../react-brackets/components/round";
import {Seed} from "../react-brackets/brackets/Seed";
import {DoubleElimination, SingleElimination} from "../react-brackets/brackets";
import {etapData} from "./etapDataFixture";

const CustomSeed = (props: IRenderSeedProps) => {
  const contest = etapData.contests.find(x=>x.id === props.seed.id);
  return (
      <Seed {...props}>
        <SeedItem>
          <div>
            <SeedTeam>{contest?.contest_members[0].id || "NO TEAM"}</SeedTeam>
            <SeedTeam>{contest?.contest_members[1].id || "NO TEAM"}</SeedTeam>
          </div>
        </SeedItem>
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
        <DoubleElimination data={etapData} renderSeedComponent={CustomSeed} roundTitleComponent={RoundTitleComponent} twoSided/>
      </div>
  );
}

export default Bracket;
