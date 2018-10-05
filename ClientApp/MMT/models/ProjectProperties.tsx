// import * as React from "react";
// import ReactGrid from "react-data-grid";
// import Column from "./classes/Column";
// import Row from "./classes/Row";
// import Auswahl from "./auswahl";

// export default class Overview extends React.Component<any, IMyState> {
//     private columns: Array<Column> = new Array<Column> ();

//     constructor(props: any, context: any) {
//         super(props, context);
//         this.createColumns();
//         this.getRows=this.getRows.bind(this);
//         this.state = { rows: this.getRows(4)};
//     }

//     render() {
//         let milestone1: { id: number, name: string }[] = [
//             { id: 0, name: "GO/MO: Project Initiation"},
//             { id: 1, name: "Confirmation"},
//             { id: 2, name: "Release 1.0 Prototype"},
//             { id: 3, name: "Release 1.0 Initial-Batch"},
//             { id: 4, name: "Release 1.1 Prototype"},
//             { id: 5, name: "Release 1.0 Serial Release"},
//             { id: 6, name: "Release 1.1 Initial-Batch"},
//             { id: 7, name: "Release 1.1 Serial Release"},
//             { id: 8, name: "Release 1.2 Serial Release"},
//             { id: 9, name: "End of Project"},
//             { id: 10, name: "Release 1.2 Stipulation"}
//           ];

//           let milestone2: { id: number, name: string }[]  = [
//             { id: 0, name: "GO/MO: Project Initiation"},
//             { id: 1, name: "Confirmation"},
//             { id: 2, name: "Release 1.3 Prototype"},
//             { id: 3, name: "Release 1.0 Initial-Batch"},
//             { id: 4, name: "Release 1.2 Prototype"},
//             { id: 5, name: "Release 1.1 Serial Release"},
//             { id: 6, name: "Release 1.2 Initial-Batch"},
//             { id: 7, name: "Release 1.2 Serial Release"},
//             { id: 8, name: "Release 1.2 Serial Release"},
//             { id: 9, name: "End of Project"},
//             { id: 10, name: "Release 1.3 Stipulation"}
//           ];
//         return (
//             <div>
//                 <ReactGrid
//                     enableCellSelect={true}
//                     columns={this.columns}
//                     rowGetter={this.getRowbyIndex}
//                     rowsCount={this.state.rows.length}
//                     minHeight={500}
//                 />
//             </div>);
//     }

//     public getRowbyIndex = (index: number): Row => {
//         return this.state.rows[index];
//     }

//     public createColumns(): void {
//         this.columns.push(new Column("id", "ID"));
//         this.columns.push(new Column("project", "Project"));
//         this.columns.push(new Column("date", "Date"));
//         this.columns.push(new Column("type", "Type"));
//         this.columns.push(new Column("status", "Status"));
//     }

//     public getRows(numberOfRows: number): Array<Row>  {
//         const rows: Array<Row>  = new Array<Row> ();
//         for (let i: number = 0; i < numberOfRows; i++) {
//             const row: Row = new Row(i,this.props.);
//             rows.push(row);
//         }
//         return rows;
//     }
// }

// interface IMyState {
//     rows: Array<Row> ;
// }



