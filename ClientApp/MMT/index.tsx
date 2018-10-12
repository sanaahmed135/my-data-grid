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
            linkedTaskPerProject : []
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

                <OverView tasks={this.state.tasks} refresh = {this.state.refresh}
                selectedProjectId={this.state.selectedProjectId} 
                linkedTaskPerProject={this.props.linkedTaskPerProject}/>

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
            refresh : true});
			this.fetchTaskByProjectId(this.state.selectedProjectId);
    }

    // private async updateTaskOnProjectSelectionChanged(selectedProjectId : string): Promise<void> {
    //     let [taskCollection, linkTaskCollection] : any = await Promise.all([this.fetchTaskByProjectId(this.state.selectedProjectId),
    //          this.fetchLinkedTasksByProjects(this.state.selectedProjectId)]);

    // }
    private async updateTaskOnProjectSelectionChanged(selectedProjId : string): Promise<void>  {
        let fetchTaskByProjectId : any = await this.fetchTaskByProjectId(this.state.selectedProjectId);
		console.log(fetchTaskByProjectId);
        // let [taskCollection, linkTaskCollection] = await Promise.all([this.fetchTaskByProjectId(selectedProjId),
        //      this.fetchLinkedTasksByProjects(selectedProjId)]);

		//  this.setState({selectedProjectId : selectedProjectId,
        //     refresh : true,
        //     tasks : taskCollection,
        //     linkedTaskPerProject : linkTaskCollection});

    }
    private fetchAllProjects(): void {
        axios.get("http://localhost:5000/kuka/GetAllProjects")
        .then((res : any )=> {
             let projects : Project[] = res.data.data;
             let defaultProject : Project = projects[0];
            this.setState({
                projects: projects,
                selectedProjectId : defaultProject.id
            });

            this.updateTaskOnProjectSelectionChanged(defaultProject.id);

         })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    // private fetchTaskByProjectId(projectId: string): any {
    //     fetch("http://localhost:5000/kuka/GetTaskByProjectUID/{"+projectId+"}")
    //         .then((res : any) => {
    //             return  res.json();
    //         });
    // }

    private fetchTaskByProjectId(projectId: string): any {
        axios.get("http://localhost:5000/kuka/GetTaskByProjectUID/{"+projectId+"}")
        .then((res : any) => {
            let task : any = res.data.data;
            // var data : any = res.json();
            console.log(task);
            return  task;
        });
    }
    private fetchLinkedTasksByProjects(projectId: string): any {
        axios.get("http://localhost:5000/kuka/getlinkedtasksbyprojectuid/{"+projectId+"}")
        .then((res : any)=> {
          return  res;
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

}
