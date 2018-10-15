import RowModel from "../models/RowModel";

export default interface IMilestoneProps {
    tasks: Array<RowModel>;
    refresh : boolean;
  }

export interface IMilestoneState {
    rows: ReadonlyArray<RowModel> ;
    originalRows : Array<RowModel>;
    startDate : any;
    selectedIndexes : Array<number>;
    fromRow: number;
    toRow: number;
    cellUpdateCss : string;
}