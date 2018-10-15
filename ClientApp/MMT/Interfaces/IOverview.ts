import RowModel from "../models/RowModel";

export default interface IOverviewProps {
    tasks: Array<RowModel>;
    refresh : boolean;
  }

export default interface IOverviewState {
    rows: ReadonlyArray<RowModel> ;
    originalRows : Array<RowModel>;
    startDate : any;
    selectedIndexes : Array<number>;
    fromRow: number;
    toRow: number;
    cellUpdateCss : string;
}

