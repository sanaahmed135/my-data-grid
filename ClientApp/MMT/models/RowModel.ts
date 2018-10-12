import moment from "moment";


export default class RowModel {
    projectId : string; // add
    task : string;
    taskChanged : boolean;
    rDate :string;
    type : string;
    status : string;
    linkedTask : string;
    // isDirty : boolean; // add


     constructor(_projectId : string,  _task : string, _rdate : string,
         _type: string, _status : string, _linkedTask : string) {
        this.projectId = _projectId;
        this.task = _task;
        this.rDate = _rdate;
        this.type = _type;
        this.status = _status;
        this.linkedTask = _linkedTask;
        this.taskChanged = false;
    }
}