import { IRoundProps } from './Rounds';

// export type ISeedProps = {
//   id?: number | string;
//   teams?: Array<{ name?: string; [key: string]: any }>;
//   date?: string;
//   mobileBreakpoint?: number;
//   [key: string]: any;
// };
  export type ISeedProps = {
    [key: string]: any;
  }

export interface IRenderSeedProps {
  seed: {id: number; virtual: boolean}; //ISeedProps;
  breakpoint: number;
  roundIndex: number;
  isMiddleOfTwoSided: boolean;
  seedIndex: number;
  rounds?: IRoundProps[];
}

export interface SchemaInterface {
  rounds: {
    id: number;
    seeds: {
      id: number;
      parentid?: number | null;
      virtual?: boolean;
    } [];
  } [];
}
