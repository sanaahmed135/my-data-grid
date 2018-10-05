import * as React from "react";
import { IImportProps } from "./Interfaces/IImport";



export default class ImportMilestones extends React.Component<IImportProps, {}> {

    constructor(props: IImportProps) {
        super(props);
        this.onImport = this.onImport.bind(this);

    }

    public render(): React.ReactElement<IImportProps> {
        return (
            <button onClick={this.onImport} >
                {this.props.milestones})
                }
            </button>
        );
    }


    private onImport(e: React.ChangeEvent<any>): void {
        let myValue: string;
        myValue = "Sana";
    }
}