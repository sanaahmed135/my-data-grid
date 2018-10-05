import * as React from "react";
import PropTypes from "prop-types";

export interface IChangedCellFormatterProps {
    value:any;
    row:any;
}
class ChangedCellFormatter extends React.Component<IChangedCellFormatterProps> {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.bool]),
    row: PropTypes.any
  };

  constructor(props:IChangedCellFormatterProps) {
      super(props);
  }

  shouldComponentUpdate(nextProps: any): boolean {
    return nextProps.value !== this.props.value;
  }

  render():JSX.Element {
    // console.log("props", this.props);
    return (<div title={this.props.value}>{this.props.value}</div>);
  }
}

export default ChangedCellFormatter;
