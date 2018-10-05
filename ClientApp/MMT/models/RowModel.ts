import TaskModel from "./TaskModel";
import moment from "moment";


export default class RowModel {
    // id: number;
    task : string;
    taskChanged : boolean;
    rDate :string;
    type : string;
    status : string;
    linkedTask : string;


     constructor( _task : string, _rdate : string, _type: string, _status : string, _linkedTask : string) {
        // this.id = _id;
        this.task = _task;
        this.rDate = _rdate;
        this.type = _type;
        this.status = _status;
        this.linkedTask = _linkedTask;
        this.taskChanged = false;
    }
}