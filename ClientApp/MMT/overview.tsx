import * as React from "react";
import ReactGrid, { Cell,Row} from "react-data-grid";
import Column from "./models/Column";
import RowModel from "./models/RowModel";
import {Promise} from "es6-promise";

// import IOverviewState  from "./Interfaces/IOverview";
// import TaskModel from "./models/TaskModel";
import { parse } from "path";
import update from "immutability-helper";
import { Editors, Toolbar, Data } from "react-data-grid-addons";
import { Button } from "react-bootstrap";
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { Selectors } = Data;
import moment from "moment";
import DatePickerBasic from "./models/DatePicker";
import ChangedCellFormater from "./ChangedCellFormater";
import CustomSelectAll from "./models/CustomSelectAll";
import Type from "./models/Type";
import Status from "./models/Status";
import axios from "axios";

interface IOverviewProps {
  tasks: Array<RowModel>;
  refresh : boolean;
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
  private types: Array<Type> = [];
  private status: Array<Status> = [];
  constructor(props: any, context: any) {
    super(props, context);
    this.createColumns = this.createColumns.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    // this.createColumns();
    this.getRows = this.getRows.bind(this);
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
    if (false === newProps.refresh) { // state will not set if user select 'No' on save changes
      return;
    }
    this.setState({ rows: this.getRows(newProps.tasks) });
    this.changeFontColor();
  }
  public componentDidMount(): void {
      this.tempAsync();
  }
  public getRowbyIndex = (index: number): RowModel => {
    return this.state.rows[index];
  }

  public createColumns(typeCollection : Type[], statusCollection : Status[]): void {
    // let types : any  = this.types;
    // let status: Array<Status> = this.status;
    let linkedTask: Array<string> = [];
    // https://github.com/adazzle/react-data-grid/issues/605
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
        key: "linkedTask",
        name: "Linked Task",
        editor: <DropDownEditor options={linkedTask} />,
        editable: true,
        resizable: true,
        sortable: true,
        width: 250,
        events: {
          onChange: (ev: React.SyntheticEvent<any>, args: any) => {
            console.log(args);
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

  public getRows(tasks: any): Array<RowModel> {
    let rows: Array<RowModel> = new Array<RowModel>();
    let temp: any= this.props.tasks;
    let nullProjectGuid :string = "00000000-0000-0000-0000-000000000000";
    for (let id: number = 0; id < tasks.length; id++) {
      let date: string =moment(tasks[id].date).format("DD.MM.YY");
      let linkedTask : string=tasks[id].linkedTask === nullProjectGuid ?"":tasks[id].linkedTask ;
      const row: RowModel = new RowModel(tasks[id].name, date, tasks[id].type, tasks[id].status, linkedTask);
      rows.push(row);

    }
    return rows;
  }


  public handleGridRowsUpdated = (e: ReactGrid.GridRowsUpdatedEvent): void => {
    let rows: Array<RowModel> = this.state.rows.slice();
    for (let i: number = e.fromRow; i <= e.toRow; i++) {
      let rowToUpdate: RowModel = rows[i] as RowModel;
      let updatedRow: RowModel = update(rowToUpdate, { $merge: e.updated });
      rows[i] = updatedRow;
    }
    this.setState({ rows: rows, fromRow: e.fromRow, toRow: e.toRow });

  }

  handleAddRow = (newRowIndex: any) => {
    // let type: Type = this.types[0];
    // let status: Status =this.status[0];
    let type: string = ["", "Evaluation", "Prototype", "Initial-Batch",
      "Serial-Release", "Project Specific", "Stipulation"][0];
    let status: string = ["", "Active", "Closed", "Removed"][0];
    let linkedTask: string = ["", "40 | Release 1.0 Prototype", "100 | EoP",
      "145 | v1.2 Stipulation", "173 | Release 1.3 Prototype", "189 | Initial-Batch"
      , "203 | Release 1.3 Serial Release", "226 | Release 1.4 Prototype"][0];
    let rDate: string = "10.10.2018";
    const newRow: RowModel = new RowModel("", rDate, type, status, linkedTask);
    let rows: ReadonlyArray<RowModel> = this.state.rows.slice();
    rows = update(rows, { $push: [newRow] });
    this.setState({ rows });
  }

  handleDeleteRow = (): any => {
    let newRows: Array<RowModel> = this.state.rows.filter((d: RowModel, i: number) =>
      this.state.selectedIndexes.indexOf(i) < 0);
    this.setState({ rows: newRows, selectedIndexes: new Array<number>() });
  }

  // // change font color to red for all the cells that are edited
  changeCellFontColor(ev: React.SyntheticEvent<any>, color: string): void {
    var cell: any = ev.currentTarget;
    cell.style.color = color;
  }

  // change font color back to black when save no changes
  changeFontColor(): void {
    var coll : any =document.getElementsByClassName("react-grid-Cell__value");
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

  private fetchAllTypes(): any {

    axios.get("http://localhost:5000/kuka/GetTypes")
        .then((response : any) => {
           this.types= response.data;
        })
        .catch((error) => {
          this.setState({ error});
      });
  }

  private fetchAllStatuses(): any {
    axios.get("http://localhost:5000/kuka/GetStatuses")
        .then((response : any) => {
           this.status= response.data;
        })
        .catch((error) => {
          this.setState({ error});
      });
  }

  private fetchAllTypesAsync(): any {
     return fetch("http://localhost:5000/kuka/GetTypes")
          .then((response : any)=> {
            return response.json();
        });
  }

  private fetchAllStatusAsync(): any {
    return fetch("http://localhost:5000/kuka/GetStatuses")
            .then((response : any)=> {
              return  response.json();
            });
  }

  private  async tempAsync(): Promise<void> {
     let [typeCollection, statusCollection] = await Promise.all([this.fetchAllTypesAsync(), this.fetchAllStatusAsync()]);
      console.log(typeCollection);
      console.log(statusCollection);

      this.createColumns(typeCollection,statusCollection);
    // let a1 = await this.fetchAllStatusAsync();
    // let a2 = await this.fetchAllTypesAsync();


  }

}
