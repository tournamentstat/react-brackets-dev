import React from "react";
import { Bracket, Seed, SeedItem, SeedTeam, SingleLineSeed, type IRoundProps, type IRenderSeedProps } from "../react-brackets";

// Demo data for 8 participants (single elimination, 3 rounds)
const rounds: IRoundProps[] = [
  {
    title: "Qualification",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: "Team 1" }, { name: "Team 2" }],
        virtual: true,
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: "Team 3" }, { name: "Team 4" }],
      },
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: "Team 5" }, { name: "Team 6" }],
        virtual: true,
      },
      {
        id: 4,
        date: new Date().toDateString(),
        teams: [{ name: "Team 7" }, { name: "Team 8" }],
      },
    ],
  },
  {
    title: "Quarterfinals",
    seeds: [
      {
        id: 5,
        date: new Date().toDateString(),
        teams: [{ name: "Winner QF1" }, { name: "Winner QF2" }],
        virtual: true,
      },
      {
        id: 6,
        date: new Date().toDateString(),
        teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
      },
        {
        id: 7,
        date: new Date().toDateString(),
        teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
      },
        {
        id: 8,
        date: new Date().toDateString(),
        teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
      },
    ],
  },
    {
    title: "Semifinals",
    seeds: [
        {
        id: 9,
        date: new Date().toDateString(),
        teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
      },
        {
        id: 10,
        date: new Date().toDateString(),
        teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
      },
    ],
  },
  {
    title: "Final",
    seeds: [
      {
        id: 11,
        date: new Date().toDateString(),
        teams: [{ name: "Winner SF1" }, { name: "Winner SF2" }],
      },
    ],
  },
];

// Optional: Custom seed renderer (to show team names and add custom content)
const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex, isSingle }: IRenderSeedProps & {isSingle?: boolean}) => (
    !isSingle ? <Seed mobileBreakpoint={breakpoint} >
    <SeedItem>
      <div>
        <SeedTeam>{seed?.teams && ( seed.teams[0]?.name || "NO TEAM" )}</SeedTeam>
        <SeedTeam>{seed?.teams && ( seed.teams[0]?.name || "NO TEAM" )}</SeedTeam>
      </div>
    </SeedItem>
  </Seed>: <SingleLineSeed mobileBreakpoint={breakpoint} >
    <SeedItem>
      <div>
        <SeedTeam>{seed?.teams && ( seed.teams[0]?.name || "NO TEAM" )}</SeedTeam>
        <SeedTeam>{seed?.teams && ( seed.teams[0]?.name || "NO TEAM" )}</SeedTeam>
      </div>
    </SeedItem>
  </SingleLineSeed>
);

const BracketTree = () => {
  return (
      <div style={{width: "100%", overflowX: "auto"}}>
        <h2>Test bracket with hidden (virtual) seeds</h2>
        <Bracket rounds={rounds} renderSeedComponent={CustomSeed}/>
      </div>
  );
}

export default BracketTree;
