import React from "react";
import { Bracket, SeedItem, SeedTeam, type IRenderSeedProps } from "../react-brackets";
import {RoundTitle} from "../react-brackets/components/round";
import {Seed} from "../react-brackets/brackets/Seed";

// Demo data for 8 participants (single elimination, 3 rounds)
// const rounds: IRoundProps[] = [
//   {
//     title: "Qualification",
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team 1" }, { name: "Team 2" }],
//         virtual: true,
//       },
//       {
//         id: 2,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team 3" }, { name: "Team 4" }],
//       },
//       {
//         id: 3,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team 5" }, { name: "Team 6" }],
//         virtual: true,
//       },
//       {
//         id: 4,
//         date: new Date().toDateString(),
//         teams: [{ name: "Team 7" }, { name: "Team 8" }],
//       },
//     ],
//   },
//   {
//     title: "Quarterfinals",
//     seeds: [
//       {
//         id: 5,
//         date: new Date().toDateString(),
//         teams: [{ name: "Winner QF1" }, { name: "Winner QF2" }],
//         virtual: true,
//       },
//       {
//         id: 6,
//         date: new Date().toDateString(),
//         teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
//       },
//         {
//         id: 7,
//         date: new Date().toDateString(),
//         teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
//       },
//         {
//         id: 8,
//         date: new Date().toDateString(),
//         teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
//       },
//     ],
//   },
//     {
//     title: "Semifinals",
//     seeds: [
//         {
//         id: 9,
//         date: new Date().toDateString(),
//         teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
//       },
//         {
//         id: 10,
//         date: new Date().toDateString(),
//         teams: [{ name: "Winner QF3" }, { name: "Winner QF4" }],
//       },
//     ],
//   },
//   {
//     title: "Final",
//     seeds: [
//       {
//         id: 11,
//         date: new Date().toDateString(),
//         teams: [{ name: "Winner SF1" }, { name: "Winner SF2" }],
//       },
//     ],
//   },
// ];

const Rounds = [
  {
    id: 1,
    title: "Final"
  },
  {
    id: 2,
    title: "Semifinal"
  },
  {
    id: 3,
    title: "Quarterfinal"
  },
  {
    id: 4,
    title: "Qualification"
  }
];

const Seeds = [
  {
    id: 1,
    date: new Date().toDateString(),
    teams: [{ name: "Team 1" }, { name: "Team 2" }],
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
  },
  {
    id: 4,
    date: new Date().toDateString(),
    teams: [{ name: "Team 7" }, { name: "Team 8" }],
  },
  {
    id: 5,
    date: new Date().toDateString(),
    teams: [{ name: "Winner QF1" }, { name: "Winner QF2" }],
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
  {
    id: 11,
    date: new Date().toDateString(),
    teams: [{ name: "Winner SF1" }, { name: "Winner SF2" }],
  }
]

const Schema = {
  rounds: [
    {
      id: 4,
      seeds: [
        {id: 4, parentid: 8},
        {id: 3, parentid: 7},
        {id: 2, parentid: 7},
        {id: 1, parentid: 5},
      ],
      singleLined: true
    },
    {
      id: 3,
      seeds: [
        {id: 8, parentid: 10},
        {id: 7, parentid: 10},
        //{id: 6, parentid: 9},
        {id: 5, parentid: 9},
      ]
    },
    {
      id: 2,
      seeds: [
        {id: 10, parentid: 11},
        {id: 9, parentid: 11},
      ]
    },
    {
      id: 1,
      seeds: [
        {id: 11, parentid: null}
      ]
    }
  ]
}

// Optional: Custom seed renderer (to show team names and add custom content)
const CustomSeed = (props: IRenderSeedProps) => {
  const seedObj = Seeds.find(x=>x.id === props.seed.id);
  return (
      <Seed {...props}>
        <SeedItem>
          <div>
            <SeedTeam>{seedObj?.teams[0]?.name || "NO TEAM"}</SeedTeam>
            <SeedTeam>{seedObj?.teams[0]?.name || "NO TEAM"}</SeedTeam>
          </div>
        </SeedItem>
      </Seed>
  );
 }

 const RoundTitleComponent = (id: number, idx: number) => {
   const round = Rounds.find(x=> x.id === id)
   return (<RoundTitle>{round?.title}</RoundTitle>);
 }

const BracketTree = () => {
  return (
      <div style={{width: "100%", overflowX: "auto"}}>
        <h2>Test bracket with hidden (virtual) seeds</h2>
        <Bracket schema={Schema} renderSeedComponent={CustomSeed} roundTitleComponent={RoundTitleComponent} twoSided/>
      </div>
  );
}

export default BracketTree;
