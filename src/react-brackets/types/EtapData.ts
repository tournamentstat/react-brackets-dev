export interface EtapDataInterface {
    contests: Array<{id: number, parentid: number | null}>;
    etap_tours: Array<
        {
            id: number;
            contests_list: Array<number>;
            name: string;
        }
    >
}