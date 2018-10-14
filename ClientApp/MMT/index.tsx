import * as React from "react";
import Auswahl from "./auswahl";
import OverView from "./overview";
import Project from "./models/project";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Button } from "react-bootstrap";
import RowModel from "./models/RowModel";
import LinkedTask from "./models/LinkedTask";
import {Promise} from "es6-promise";
import axios from "axios";

 interface IState {
    tasks : Array<RowModel>;
    hideDialog : boolean;
    selectedProjectId : string;
    refresh : boolean;
    error : string;
    isLoading : boolean;
    projects : Array<Project>;
    linkedTaskPerProject : Array<LinkedTask>;
 }

export default class MMT extends React.Component<any,IState> {

    private updatedRowsFromOverViewComponent : RowModel[] = [];

    constructor(props : any) {
        super(props);

        this.state = {
            projects : [],// this.getProjectObject(),
            tasks : [], // this.filterTaskByProjectId("1"),
            selectedProjectId: "",
            hideDialog: true,
            refresh:false,
            error:"",
            isLoading : false,
            linkedTaskPerProject : [],
            rows : []
        } ;

        this.fetchTaskOnProjectSelectionChanged = this.fetchTaskOnProjectSelectionChanged.bind(this);
    }

    public render(): any {
        return (

            <div>
                <script src="fabric.min.js"></script>
                    <Auswahl collection = {this.state.projects} onAuswahl={this.fetchTaskOnProjectSelectionChanged} />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <DefaultButton >Import all unlinked Milestones from Project Plan</DefaultButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <DefaultButton style={{backgroundColor:"green", color:"white"}} secondaryText="Opens the Sample Dialog"
                        onClick={this.showSaveChangesDialogBox} text="SAVE CHANGES" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button bsStyle="link">Milestone Management</Button>
                <br/>

                <OverView tasks={this.state.tasks}
                          refresh = {this.state.refresh}
                          onRowUpdate = {this.onOverViewGirdRowUpdate}
                          linkedTaskPerProject={this.state.linkedTaskPerProject}/>

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

    public componentDidMount(): void {
        this.InitlizeAsync();
    }

    private async InitlizeAsync(): Promise<void> {
      let projects : Project[] =  await this.fetchAllProjectsAsync();
      let defaultProjectId : string = projects[1].id;
      let tasks : RowModel[] = await this.fetchMilestonesByProjectIdAsync(defaultProjectId);
      let linkedTasks : LinkedTask [] = await this.fetchLinkedTasksByProjectsAsync(defaultProjectId);

      this.setState({
          tasks : tasks,
          refresh : true,
          selectedProjectId : defaultProjectId,
          linkedTaskPerProject : linkedTasks,
          projects : projects
      });
    }

    private showSaveChangesDialogBox = (): void => {
        this.setState({ hideDialog: false , refresh : false });
    }

    private closeSaveChangesDialogBox = (): void => {
        this.setState({ hideDialog: true });
    }

    private saveChanges = (): void => {
        console.log(this.updatedRowsFromOverViewComponent);
        this.setState({
            hideDialog: true,
            refresh : false});
    }

    private  discardChangesAndRefresh = (): void => {
		this.setState({
            hideDialog: true,
            refresh : true});
			this.fetchMilestonesByProjectIdAsync(this.state.selectedProjectId);
    }

    private async fetchTaskOnProjectSelectionChanged(selectedProjectId : string): Promise<void>  {

      let tasks : RowModel[] = await this.fetchMilestonesByProjectIdAsync(selectedProjectId);
      let linkedTasks : LinkedTask [] = await this.fetchLinkedTasksByProjectsAsync(selectedProjectId);
      this.setState({
          tasks : tasks,
          refresh : true,
          selectedProjectId : selectedProjectId,
          linkedTaskPerProject : linkedTasks
        });
    }

    private async fetchAllProjectsAsync(): Promise<Project[]> {
        let response : any = await fetch("http://localhost:5000/kuka/GetAllProjects");
        let  responseAsJson :any = await response.json();
        return responseAsJson.data;
    }

    private async fetchMilestonesByProjectIdAsync(projectId: string): Promise<RowModel[]> {
        let response : any = await fetch("http://localhost:5000/kuka/GetTaskByProjectUID/{"+projectId+"}");
        let  responseAsJson :any = await response.json();
        return responseAsJson;

    }

    private async fetchLinkedTasksByProjectsAsync(projectId: string):  Promise<LinkedTask[]> {
        let response : any = await fetch("http://localhost:5000/kuka/getlinkedtasksbyprojectuid/{"+projectId+"}");
        let  responseAsJson :any = await response.json();
        return responseAsJson;
    }

    private onOverViewGirdRowUpdate(updatedRows : RowModel[]): void {
       this.updatedRowsFromOverViewComponent = updatedRows;
       console.log(this.updatedRowsFromOverViewComponent);
    }

}
