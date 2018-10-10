import * as React from "react";
import Auswahl from "./auswahl";
import OverView from "./overview";
import Project from "./models/project";
import TaskModel from "./models/TaskModel";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Button } from "react-bootstrap";
import axios from "axios";

 interface IState {
    tasks : Array<TaskModel>;
    hideDialog : boolean;
    selectedProjectId : string;
    refresh : boolean;
    error : string;
    isLoading : boolean;
    projects : Array<Project>;
 }

export default class MMT extends React.Component<any,IState> {

    constructor(props : any) {
        super(props);

        this.state = {
            projects : [],// this.getProjectObject(),
            tasks : [], // this.filterTaskByProjectId("1"),
            selectedProjectId: "",
            hideDialog: true,
            refresh:false,
            error:"",
            isLoading : false
        } ;

        this.updateTaskOnProjectSelectionChanged = this.updateTaskOnProjectSelectionChanged.bind(this);
    }

    public componentDidMount(): void {
        this.fetchAllProjects();
    }
    public render(): any {
        return (

            <div>
                <script src="fabric.min.js"></script>
                    <Auswahl collection = {this.state.projects} onAuswahl={this.updateTaskOnProjectSelectionChanged} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <DefaultButton >Import all unlinked Milestones from Project Plan</DefaultButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <DefaultButton style={{backgroundColor:"green", color:"white"}} secondaryText="Opens the Sample Dialog"
                        onClick={this.showSaveChangesDialogBox} text="SAVE CHANGES" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button bsStyle="link">Milestone Management</Button>
                <br/>

                <OverView tasks={this.state.tasks} refresh = {this.state.refresh}/>

                  {/* Dialog box for  save changes */}
                  <Dialog
                    hidden={this.state.hideDialog}
                    onDismiss={this.closeSaveChangesDialogBox}
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
                        <PrimaryButton onClick={this.saveChanges} text="Yes" />
                        <DefaultButton onClick={this.discardChangesAndRefresh} text="No" />
                    </DialogFooter>
                    </Dialog>
            </div>);
    }

    private showSaveChangesDialogBox = (): void => {
        this.setState({ hideDialog: false , refresh : false });
    }

    private closeSaveChangesDialogBox = (): void => {
        this.setState({ hideDialog: true });
    }

    private saveChanges = (): void => {
        this.setState({
            hideDialog: true,
            refresh : false});
    }

    private discardChangesAndRefresh = (): void => {
        this.setState({
            hideDialog: true,
            tasks:this.filterTaskByProjectId(this.state.selectedProjectId),
            refresh : true});
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

    private updateTaskOnProjectSelectionChanged(selectedProjectId : string): void {

        this.setState({tasks : this.filterTaskByProjectId(selectedProjectId),
                       selectedProjectId : selectedProjectId,
                       refresh : true
                    });
    }

    private filterTaskByProjectId(projectId: string): Array<TaskModel> {
        this.fetchTasksByProjectUID(projectId);
        return [];
        //return this.tasks.filter((t)=> t.projectId === projectId);
    }

    private fetchAllProjects(): void {
        axios.get("http://localhost:5000/test/GetAllProjects")
       .then((res : any )=> {
            this.setState({
                projects: res.data
               // selectedProjectId : res.data[0]
            });
        // console.log(res);
    })
        // catch any errors we hit and update the app
        .catch(error => this.setState({ error, isLoading: false }));
    }

    private fetchTasksByProjectUID(projectId: string): any {
        console.log(projectId);
        axios.get("http://localhost:5000/Test/GetTaskByProjectUID/{"+projectId+"}")
            .then(response => {
                this.setState({
                    tasks : response.data
                });
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
                console.log(error);}
            );
    }

}
