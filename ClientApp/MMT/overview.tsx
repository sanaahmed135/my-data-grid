import * as React from "react";
import ReactGrid, { Cell,Row} from "react-data-grid";
import Column from "./models/Column";
import RowModel from "./models/RowModel";
import update from "immutability-helper";
import { Editors, Toolbar, Data } from "react-data-grid-addons";
const { DropDownEditor } = Editors;
import DatePickerBasic from "./models/DatePicker";
import ChangedCellFormater from "./ChangedCellFormater";
import CustomSelectAll from "./models/CustomSelectAll";

interface IOverviewProps {
  tasks: Array<RowModel>;
  refresh : boolean;
  onRowUpdate : (rows : RowModel[]) => void;
  linkedTaskPerProject : string [];
}

interface IOverviewState {
  rows: ReadonlyArray<RowModel> ;
  originalRows : Array<RowModel>;
  startDate : any;
  selectedIndexes : Array<number>;
  fromRow: number;
  toRow: number;
  cellUpdateCss : string;
  error : string;
}
class CustomRowSelectorCell extends Editors.CheckboxEditor {
  render(): any {
    return super.render();
  }
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-data-grid/react-data-grid-tests.tsx

export default class Overview extends React.Component<IOverviewProps, IOverviewState> {
  private columns: Array<Column> = new Array<Column>();
  private types: Array<string> = [];
  private statuses: Array<string> = [];

  constructor(props: any, context: any) {
    super(props, context);
    this.createColumns = this.createColumns.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    let originalRows: Array<RowModel> = [];

    this.state = {
      rows: [],
      originalRows: originalRows,
      startDate: new Date(),
      selectedIndexes: new Array<number>(),
      fromRow: 0,
      toRow: 0,
      cellUpdateCss: "red",
      error:"",
    };
  }

  render(): any {
    return (
      <div>
        <ReactGrid
          ref="grid"
          rowKey="id"
          enableCellSelect={true}
          enableDragAndDrop={true}
          columns={this.columns}
          rowGetter={this.getRowbyIndex}
          rowsCount={this.state.rows.length}
          minHeight={400}
          onGridSort={this.handleGridSort}
          toolbar={<Toolbar onAddRow={this.handleAddRow} />}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          enableRowSelect={true}
          rowHeight={50}
          rowScrollTimeout={200}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}
          rowActionsCell={CustomRowSelectorCell}
          selectAllRenderer={CustomSelectAll}
          // onRowClick={this.onRowClick}
        />
        <button onClick={this.handleDeleteRow}>Delete Tasks</button>
      </div>
    );
  }

  onRowClick = (rowIdx: number, row: Object) => {
    // just test
  }
  onRowsSelected = (rows: Array<AdazzleReactDataGrid.SelectionParams>) => {
    let rowIndexes: Array<number> = rows.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.concat(rowIndexes) });
  }

  onRowsDeselected = (rows: Array<AdazzleReactDataGrid.SelectionParams>) => {
    let rowIndexes: Array<number> = rows.map(r => r.rowIdx);
    this.setState({ selectedIndexes: this.state.selectedIndexes.filter((i: number) => rowIndexes.indexOf(i) === -1) });
  }

  public componentWillReceiveProps(newProps: IOverviewProps): void {
        if (false === newProps.refresh) {return; }

        this.generateColumnAsync(newProps.tasks);
        this.changeFontColor();

  }

  public componentDidMount(): void {

    this.generateColumnAsync(this.props.tasks);
  }

  public getRowbyIndex = (index: number): RowModel => {
    return this.state.rows[index];
  }

  public createColumns(typeCollection : string[], statusCollection : string[],linkedTaskCollection : string[]): void {
    this.columns= [
      {
        key: "task",
        name: "Name",
        editable: true,
        resizable: true,
        sortable: true,
        width: 400,
        formatter: ChangedCellFormater,
        events: {
          onChange: (ev: React.SyntheticEvent<any>, args: { rowIdx: number, idx: number, name: string }) => {
            this.changeCellFontColor(ev, "red");
          }
        }
      },
      {
        key: "rDate",
        name: "Date",
        formatter: <DatePickerBasic></DatePickerBasic>,
        editable: true,
        resizable: true,
        sortable: true,
        width: 110
      },
      {
        key: "type",
        name: "Type",
        editor: <DropDownEditor options={typeCollection} />,
        editable: true,
        resizable: true,
        sortable: true,
        width: 150,
        events: {
          onChange: (ev: React.SyntheticEvent<any>, args: { rowIdx: number, idx: number, name: string }) => {
            this.changeCellFontColor(ev, "red");
          }
        }
      },
      {
        key: "status",
        name: "Status",
        editor: <DropDownEditor options={statusCollection} />,
        editable: true,
        resizable: true,
        sortable: true,
        width: 100,
        events: {
          onChange: (ev: React.SyntheticEvent<any>, args: { rowIdx: number, idx: number, name: string }) => {
            this.changeCellFontColor(ev, "red");

          }
        }
      },
      {
        key: "linkedTaskName",
        name: "Linked Task",
        editor: <DropDownEditor options={linkedTaskCollection} />,
        editable: true,
        resizable: true,
        sortable: true,
        width: 250,
        events: {
          onChange: (ev: React.SyntheticEvent<any>, args: any) => {
            this.changeCellFontColor(ev, "red");
          }
        }
      }
    ];

  }


  public handleChange(date: Date): void {
    this.setState({
      startDate: date
    });
  }

  public handleGridRowsUpdated = (e: ReactGrid.GridRowsUpdatedEvent): void => {
    let rows: Array<RowModel> = this.state.rows.slice();

    for (let i: number = e.fromRow; i <= e.toRow; i++) {
          let rowToUpdate: RowModel = rows[i] as RowModel;
          let updatedRow: RowModel = update(rowToUpdate, { $merge: e.updated });
          rows[i] = updatedRow;
      }
    this.setState({ rows: rows, fromRow: e.fromRow, toRow: e.toRow });
    this.props.onRowUpdate(rows);
  }

  handleAddRow = (newRowIndex: any) => {

    const newRow: RowModel = new RowModel("",
                                          "",
                                          "14.11.1901",
                                          this.types[0],
                                          this.statuses[0],
                                          this.props.linkedTaskPerProject[0]);

    let rows: ReadonlyArray<RowModel> = this.state.rows.slice();
    rows = update(rows, { $push: [newRow] });
    this.setState({ rows });
  }

  handleDeleteRow = (): any => {
    let newRows: Array<RowModel> = this.state.rows.filter((d: RowModel, i: number) =>
      this.state.selectedIndexes.indexOf(i) < 0);
    this.setState({ rows: newRows, selectedIndexes: new Array<number>() });
  }

  changeCellFontColor(ev: React.SyntheticEvent<any>, color: string): void {
    var cell: any = ev.currentTarget;
    cell.style.color = color;
  }

  changeFontColor(): void {
    var coll : any = document.getElementsByClassName("react-grid-Cell__value");
    for(var i : number=0, len : number=coll.length; i<len; i++) {
        coll[i].style.color = "black";
    }
  }

  handleGridSort = (sortColumn: string, sortDirection: string): any => {
    const comparer: any = (a: any, b: any) => {
      if (sortDirection === "ASC") {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows: Array<RowModel> = ((sortDirection === "NONE")
      ? this.state.originalRows.slice(0)
      : this.state.rows.slice(0).sort(comparer));
    this.setState({ rows });
  }

  private async fetchAllTypesAsync(): Promise<string[]> {
    var response : any  = await fetch("http://localhost:5000/kuka/GetTypes");
    return await response.json();
  }

  private async fetchAllStatusAsync(): Promise<string[]> {
    var response : any  = await fetch("http://localhost:5000/kuka/GetStatuses");
    return await response.json();
  }

  private  async generateColumnAsync(tasks : RowModel[]): Promise<void> {
      let [typeCollection, statusCollection] = await Promise.all([this.fetchAllTypesAsync(),this.fetchAllStatusAsync()]);
      await this.createColumns(typeCollection,statusCollection,this.props.linkedTaskPerProject);
      this.types = typeCollection;
      this.statuses = statusCollection;
      this.setState({ rows: tasks});

  }

}
