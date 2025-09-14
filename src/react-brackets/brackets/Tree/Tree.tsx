import {TreeProps} from "../../types/SingleElimination";
import useMedia from "../../hooks/useMedia";
import {TreeSeedProps} from "../../types/Seed";
import React, {Fragment} from "react";
import {SchemaInterface} from "../../types/Schema";
import {Bracket, Round, SeedsList} from "../../components/round";
import SwipeableViews from "react-swipeable-views";
import {TreeRoundProps} from "../../types/Rounds";

export const Tree = ({
  schema,
  rtl = false,
  roundClassName,
  bracketClassName,
  swipeableProps = {},
  mobileBreakpoint = 992,
  twoSided = false,
  renderSeedComponent,
  roundTitleComponent,
}: TreeProps) => {
  // Checking responsive size
  const isResponsive = useMedia(mobileBreakpoint);

  const getFragment = (
    seed: TreeSeedProps,
    roundIdx: number,
    idx: number,
    isMiddleOfTwoSided: any,
    singleLined: boolean,
    virtual: boolean
  ) => (
    <Fragment key={seed.id}>
      {renderSeedComponent({
        seed,
        breakpoint: mobileBreakpoint,
        roundIndex: roundIdx,
        seedIndex: idx,
        isMiddleOfTwoSided,
        singleLined: singleLined,
        virtual: virtual
      })}
    </Fragment>
  );

  const tree = (schema: SchemaInterface) => {
    const rounds = schema.rounds;
    let virtual_seeds_counter = 0;
    const virtual_seed = (singleLined: boolean) => {
      return ({
        id: --virtual_seeds_counter,
        virtual: true,
        singleLined: singleLined
      })
    }
    const real_seed = (id: number, singleLined: boolean) => {
      return ({
        id: id,
        virtual: false,
        singleLined: singleLined
      });
    }
    const depth = rounds.length;
    if (depth<1) return [];
    const final_round = rounds[depth-1];
    const final_seed = final_round.seeds[0];
    const tree = [{
        id: final_round.id,
        seeds: [real_seed(final_seed.id, (final_round.singleLined ?? false) || twoSided)]
    }];
    for (let i = 1; i<depth; i++) {
        const roundSeeds = [];
            const singleLined = rounds[depth-i-1].singleLined ?? false;
            for(let j=0; j < tree[i-1].seeds.length; j++) {
                const previous_tour_seed = tree[i-1].seeds[j];
                if (previous_tour_seed.virtual) {
                    roundSeeds.push(virtual_seed(singleLined));
                    if(!singleLined) roundSeeds.push(virtual_seed(singleLined));
                } else {
                    const child_contests = rounds[depth-i-1].seeds.filter(x=> x.parentid === previous_tour_seed.id)??[];
                    switch (child_contests.length){
                        case 1:
                            roundSeeds.push(real_seed(child_contests[0].id, singleLined));
                            if(!singleLined) roundSeeds.push(virtual_seed(singleLined));
                            break;
                        case 2:
                            roundSeeds.push(real_seed(child_contests[0].id, singleLined));
                            if(!singleLined) roundSeeds.push(real_seed(child_contests[1].id, singleLined));
                            break;
                        default:
                            roundSeeds.push(virtual_seed(singleLined));
                            if(!singleLined) roundSeeds.push(virtual_seed(singleLined));
                    }
                }
            }
            tree.push({
                id: rounds[depth-i-1].id,
                seeds: roundSeeds
            })
        }
    return tree.reverse();
  }

  const rounds = tree(schema);
  const data = rounds.map((round, roundIdx) => (
    <Round key={round.id} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
      {roundTitleComponent(round.id, roundIdx)}
      <SeedsList>
        {round.seeds.map((seed, idx) => {
          return getFragment(seed, roundIdx, idx, false, seed.singleLined, seed.virtual);
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

  const getRenderedRounds = (
    roundsStartIndex: number,
    roundsEndIndex: number,
    renderFirstHalfOfRoundsSeeds: boolean,
    rounds: TreeRoundProps[],
    dir: string
  ) =>
    rounds.slice(roundsStartIndex, roundsEndIndex).map((round, roundIdx) => (
      <Round key={round.id} className={roundClassName} mobileBreakpoint={mobileBreakpoint}>
        {roundTitleComponent(round.id, roundIdx)}
        <SeedsList dir={dir}>
          {renderFirstHalfOfRoundsSeeds
            ? round.seeds
                .slice(0, round.seeds.length / 2)
                .map((seed, idx: number) => getFragment(seed, roundIdx, idx, false, seed.singleLined, seed.virtual))
            : round.seeds
                .slice(round.seeds.length / 2, round.seeds.length)
                .map((seed, idx: number) => getFragment(seed, roundIdx, idx, roundIdx < roundsEndIndex - 2, seed.singleLined, seed.virtual))}
        </SeedsList>
      </Round>
    ));

  if (twoSided) {
    return (
      <Bracket className={bracketClassName} mobileBreakpoint={mobileBreakpoint}>
        {[
          getRenderedRounds(0, rounds.length - 1, true, rounds, 'ltr'),
          getRenderedRounds(rounds.length - 1, rounds.length, false, rounds, 'twoSided'),
          getRenderedRounds(1, rounds.length, false, [...rounds].reverse(), 'rtl'),
        ]}
      </Bracket>
    );
  }

  return (
    <Bracket className={bracketClassName} dir={rtl ? 'rtl' : 'ltr'} mobileBreakpoint={mobileBreakpoint}>
      {data}
    </Bracket>
  );
};
