export default class Project {
    id : string;
    name : string;
    author? : string;

    constructor(_id : string,_name : string) {
        this.id=_id;
        this.name=_name;
    }
}