export interface SchemaInterface {
  rounds: {
    id: number;
    singleLined?: boolean;
    seeds: {
      id: number;
      parentid?: number | null;
      virtual?: boolean;
    } [];
  } [];
}