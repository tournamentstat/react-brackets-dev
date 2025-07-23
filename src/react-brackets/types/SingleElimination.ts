import { SwipeableViewsProps } from 'react-swipeable-views';
import {IRenderSeedProps} from './Seed';
import {SchemaInterface} from './Schema';
import React from "react";

export interface ISingleEliminationProps {
  // If true, the component direction will be set to RTL
  rtl?: boolean;
  // Array of rounds matching RoundProps shape,
  schema: SchemaInterface;
  // Single round className
  roundClassName?: string;
  /** @default 992, if you don't want a mobile breakpoint, pass 0 */
  mobileBreakpoint?: number;
  // The whole bracket className
  bracketClassName?: string;
  /** {@link https://github.com/oliviertassinari/react-swipeable-views} to read about it's props  */
  swipeableProps?: SwipeableViewsProps;
  /**
   * @param {string} title string or component passed with each round
   * @param {number} round the current round index
   */
  roundTitleComponent: (id: number, roundIdx: number) => React.JSX.Element;
  /**
   * @param {object} seed the current seed
   * @param {number} breakpoint the breakpoint used to determine responsive size
   * @param {number} roundIdx the current round index
   */
  renderSeedComponent: (props: IRenderSeedProps) => React.JSX.Element;
  /** @default false, if true component will be two-sided tournament **/
  twoSided?: boolean;
}
