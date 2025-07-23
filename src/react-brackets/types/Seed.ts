export type ISeedProps = {
    [key: string]: any;
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
