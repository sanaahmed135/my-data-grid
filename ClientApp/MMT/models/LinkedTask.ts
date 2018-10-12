export default class LinkedTask {
    TaskUID : string;
    TaskName : string;

    constructor(_TaskUID : string,_TaskName : string) {
        this.TaskUID=_TaskUID;
        this.TaskName=_TaskName;
    }
}