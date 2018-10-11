import * as React from "react";
import Auswahl from "./auswahl";
import OverView from "./overview";
import Project from "./models/project";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Button } from "react-bootstrap";
import axios from "axios";
import RowModel from "./models/RowModel";

 interface IState {
    tasks : Array<RowModel>;
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
            refresh : true});
			this.fetchTaskByProjectId(this.state.selectedProjectId);
    }

    private updateTaskOnProjectSelectionChanged(selectedProjectId : string): void {
        this.setState({ selectedProjectId : selectedProjectId,
                        refresh : true
                    });

        this.fetchTaskByProjectId(selectedProjectId);
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

    private fetchTaskByProjectId(projectId: string): void {
        axios.get("http://localhost:5000/kuka/GetTaskByProjectUID/{"+projectId+"}")
            .then((response : any) => {
                this.setState({
                    tasks : response.data
                });
            })
            .catch((error) => {
                this.setState({ error, isLoading: false });
            });
    }

    private fetchAllTypes(): void {
        axios.get("http://localhost:5000/kuka/GetTypes")
            .then((response : any) => {
                console.log(response);
            })
            .catch((error) => {
                this.setState({ error});
            });
    }

}
