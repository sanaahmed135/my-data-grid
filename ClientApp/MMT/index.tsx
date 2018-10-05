﻿import * as React from "react";
import Auswahl from "./auswahl";
import OverView from "./overview";
import Project from "./models/project";
import TaskModel from "./models/TaskModel";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";


 interface IState {
    tasks : Array<TaskModel>;
    hideDialog : boolean;
    selectedProjectId : string;
    refresh : boolean;
 }

export default class MMT extends React.Component<any,IState> {
    public projList : Array<Project>;
    public tasks : Array<TaskModel>;

    constructor(props : any) {
        super(props);
        this.projList = this.getProjects();
        this.tasks = this.getTasks();
        this.state = {tasks : this.filterTaskByProjectId("1"), selectedProjectId:"1",
        hideDialog: true,refresh:false} ;

        // this.onClickEvent = this.onClickEvent.bind(this);
        this.callback = this.callback.bind(this);
    }

    public render(): any {
        return (

            <div>
                {/* <link rel="stylesheet" href="fabric.min.css" />
                <link rel="stylesheet" href="fabric.components.min.css" /> */}
                {/* <link rel="stylesheet" href="./css/style.css" /> */}
                <script src="fabric.min.js"></script>
                    <Auswahl collection = {this.projList} onAuswahl={this.callback} />
                    <button >Import all unlinked Milestones from Project Plan</button>
                    <DefaultButton style={{backgroundColor:"green", color:"white"}} secondaryText="Opens the Sample Dialog"
                        onClick={this._showDialog} text="SAVE CHANGES" />
                <br/>

                <OverView tasks={this.state.tasks} refresh = {this.state.refresh}/>

                  {/* Dialog box for  save changes */}
                  <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={this._closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: "Approval",
                        subText:
                        "Do you really want to save the changes?"
                    }}
                    modalProps={{
                        titleAriaId: "myLabelId",
                        subtitleAriaId: "mySubTextId",
                        isBlocking: false,
                        containerClassName: "ms-dialogMainOverride"
                    }}>
                    {null /** You can also include null values as the result of conditionals */}
                    <DialogFooter>
                        <PrimaryButton onClick={this._saveChanges} text="Yes" />
                        <DefaultButton onClick={this._cancelChanges} text="No" />
                    </DialogFooter>
                    </Dialog>
            </div>);
    }

    private _showDialog = (): void => {
        this.setState({ hideDialog: false , refresh : false });
    }

    private _closeDialog = (): void => {
        this.setState({ hideDialog: true });
    }

    private _saveChanges = (): void => {
        this.setState({
            hideDialog: true,
            refresh : false});
    }
    private _cancelChanges = (): void => {
        this.setState({
            hideDialog: true,
            tasks:this.filterTaskByProjectId(this.state.selectedProjectId),
            refresh : true});
    }


    private getProjects(): Array<Project> {
        let collection : Array<Project> = new Array<Project>();
        collection.push(new Project("1","Proj1"));
        collection.push(new Project("2","Proj2"));
        collection.push(new Project("3","Proj3"));
        collection.push(new Project("4","Proj4"));
        collection.push(new Project("5","Proj5"));

        return collection;
    }

    private getTasks(): Array<TaskModel> {
        let collection : Array<TaskModel> = new Array<TaskModel>();
        collection.push(new TaskModel("1","GO/MO: Project Initiation","1"));
        collection.push(new TaskModel("2","Confirmation","1"));
        collection.push(new TaskModel("3","Release 1.0 Prototype","1"));
        collection.push(new TaskModel("4","Release 1.1 Initial-Batch","2"));
        collection.push(new TaskModel("5","Release 1.1 Prototype","2"));
        collection.push(new TaskModel("6","Release 1.0 Serial-Release","2"));
        collection.push(new TaskModel("7","Release 1.2 Serial-Release","3"));
        collection.push(new TaskModel("8","Release 1.3 Prototype","3"));
        collection.push(new TaskModel("9","Release 1.2 Confirmation","3"));
        collection.push(new TaskModel("10","Release 1.2 Prototype","4"));
        collection.push(new TaskModel("11","Release 1.0 Confirmation","4"));
        collection.push(new TaskModel("12","Confirmation","5"));
        collection.push(new TaskModel("13","Release 1.4 Prototype","5"));
        collection.push(new TaskModel("14","Release 1.4 Initial-Batch","5"));
        return collection;
    }

    private callback(selectedProjectId : string): void {
        this.setState({tasks : this.filterTaskByProjectId(selectedProjectId),
                       selectedProjectId : selectedProjectId,
                       refresh : true
                    });
    }

    private filterTaskByProjectId(projectId: string): Array<TaskModel> {

        return this.tasks.filter((t)=> t.projectId === projectId);
    }

    private onClickEvent( e: any): void {
        alert(e.selectedProject);
    }
}