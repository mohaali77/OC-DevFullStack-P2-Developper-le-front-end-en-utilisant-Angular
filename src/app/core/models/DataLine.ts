import { Series } from "./Series";

export interface DataLine {
    name: string | undefined;
    series: Series[];
}
