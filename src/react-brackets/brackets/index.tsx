import React, { Fragment } from 'react';
import { Round, Bracket, SeedsList } from '../components/round';
import SwipeableViews from 'react-swipeable-views';
import useMedia from '../hooks/useMedia';
//import { renderSeed, renderTitle } from '../utils/renders';
import { ISingleEliminationProps } from '../types/SingleElimination';
//import { IRoundProps } from '../types/Rounds';
import {SchemaInterface} from '../types/Seed';

const SingleElimination = ({
  schema,
  rtl = false,
  roundClassName,
  bracketClassName,
  swipeableProps = {},
  mobileBreakpoint = 992,
  twoSided = false,
  renderSeedComponent,
  roundTitleComponent,
}: ISingleEliminationProps) => {
  // Checking responsive size
  const isResponsive = useMedia(mobileBreakpoint);

  const getFragment = (
    seed: {id: number, virtual: boolean},
    roundIdx: number,
    idx: number,
    isMiddleOfTwoSided: any
  ) => (
    <Fragment key={seed.id}>
      {renderSeedComponent({
        seed,
        breakpoint: mobileBreakpoint,
        roundIndex: roundIdx,
        seedIndex: idx,
        isMiddleOfTwoSided,
      })}
    </Fragment>
  );

  const tree = (schema: SchemaInterface) => {
    const rounds = schema.rounds;
    let virtual_seeds_counter = 0;
    const virtual_seed = () => {
      return ({
        id: --virtual_seeds_counter,
        virtual: true
      })
    }
    const real_seed = (id: number) => {
      return ({
        id: id,
        virtual: false
      });
    }
    const depth = rounds.length;
    if (depth<1) return [];
    const final_round = rounds[depth-1];
    const final_seed = final_round.seeds[0];
    const tree = [{
        id: final_round.id,
        seeds: [real_seed(final_seed.id)]
    }];
    for (let i = 1; i<depth; i++) {
        const roundSeeds = [];
            for(let j=0; j < 2 ** (i-1); j++) {
                const previous_tour_seed = tree[i-1].seeds[j];
                if (previous_tour_seed.virtual) {
                    roundSeeds.push(virtual_seed());
                    roundSeeds.push(virtual_seed());
                } else {
                    const child_contests = rounds[depth-i-1].seeds.filter(x=> x.parentid === previous_tour_seed.id)??[];
                    switch (child_contests.length){
                        case 1:
                            roundSeeds.push(real_seed(child_contests[0].id));
                            roundSeeds.push(virtual_seed());
                            break;
                        case 2:
                            roundSeeds.push(real_seed(child_contests[0].id));
                            roundSeeds.push(real_seed(child_contests[1].id));
                            break;
                        default:
                            roundSeeds.push(virtual_seed());
                            roundSeeds.push(virtual_seed());
                    }
                }
            }
            tree.push({
                id: rounds[depth-i-1].id,
                seeds: roundSeeds
            })
        }
    console.log(tree);
    return tree.reverse();
  }

  const data = tree(schema).map((round, roundIdx) => (
    <Round key={round.id} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
      {roundTitleComponent(round.id, roundIdx)}
      <SeedsList>
        {round.seeds.map((seed, idx) => {
          return getFragment(seed, roundIdx, idx,false);
        })}
      </SeedsList>
    </Round>
  ));

  if (isResponsive) {
    // Since SwipeableViewsProps have an issue that it uses ref inside of it, We need to remove ref from the object
    const { ...rest } = swipeableProps;
    return (
      <Bracket className={bracketClassName} dir={rtl ? 'rtl' : 'ltr'} mobileBreakpoint={mobileBreakpoint}>
        <SwipeableViews style={{ minHeight: '500px' }} axis={rtl ? 'x-reverse' : 'x'} {...rest}>
          {data}
        </SwipeableViews>
      </Bracket>
    );
  }

  // const getRenderedRounds = (
  //   roundsStartIndex: number,
  //   roundsEndIndex: number,
  //   renderFirstHalfOfRoundsSeeds: boolean,
  //   rounds: IRoundProps[],
  //   dir: string
  // ) =>
  //   rounds.slice(roundsStartIndex, roundsEndIndex).map((round, roundIdx) => (
  //     <Round key={round.title} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
  //       {round.title && roundTitleComponent(round.title, roundIdx)}
  //       <SeedsList dir={dir}>
  //         {renderFirstHalfOfRoundsSeeds
  //           ? round.seeds
  //               .slice(0, round.seeds.length / 2)
  //               .map((seed, idx) => getFragment(seed, roundIdx, idx, rounds, false))
  //           : round.seeds
  //               .slice(round.seeds.length / 2, round.seeds.length)
  //               .map((seed, idx) => getFragment(seed, roundIdx, idx, rounds, roundIdx < roundsEndIndex - 2))}
  //       </SeedsList>
  //     </Round>
  //   ));
  //
  // if (twoSided) {
  //   return (
  //     <Bracket className={bracketClassName} mobileBreakpoint={mobileBreakpoint}>
  //       {[
  //         getRenderedRounds(0, rounds.length - 1, true, rounds, 'ltr'),
  //         getRenderedRounds(rounds.length - 1, rounds.length, false, rounds, 'twoSided'),
  //         getRenderedRounds(1, rounds.length, false, [...rounds].reverse(), 'rtl'),
  //       ]}
  //     </Bracket>
  //   );
  // }

  return (
    <Bracket className={bracketClassName} dir={rtl ? 'rtl' : 'ltr'} mobileBreakpoint={mobileBreakpoint}>
      {data}
    </Bracket>
  );
};

export { SingleElimination };
