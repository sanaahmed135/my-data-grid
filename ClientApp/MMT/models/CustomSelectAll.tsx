import * as React from "react";

export interface ICustomSelectAllProps {
    onChange: any;
    inputRef: any;
  }

export default class CustomSelectAll extends React.Component<ICustomSelectAllProps> {
render(): any {
    return (
    <div className="react-grid-checkbox-container checkbox-align">
        <input
        className="react-grid-checkbox"
        type="checkbox"
        name="select-all-checkbox"
        id="select-all-checkbox"
        ref={this.props.inputRef}
        onChange={this.props.onChange}
        />
        <label htmlFor="select-all-checkbox" className="react-grid-checkbox-label"></label>
    </div>
    );
}
}