export type ISeedProps = {
    [key: string]: any;
}

export type TreeSeedProps = {
  id: number;
  singleLined: boolean;
  virtual: boolean;
}

export interface IRenderSeedProps {
  seed: {id: number; virtual: boolean};
  breakpoint: number;
  roundIndex: number;
  isMiddleOfTwoSided: boolean;
  seedIndex: number;
  virtual?: boolean;
  singleLined?: boolean;
}
