/*
import * as React from "react";
import RowModel from "./RowModel";
import PropTypes from "prop-types";
import {Row} from "react-data-grid";

export default class RowRenderer extends React.Component<any, any> {
    static propTypes = {
      idx: PropTypes.string.isRequired
    };

    setScrollLeft = (scrollBy : any) => {
      // if you want freeze columns to work, you need to make sure you implement this as apass through
      this.state.row.setScrollLeft(scrollBy);
    }

    getRowStyle = () => {
      return {
        color: this.geatRowBackground()
      };
    }

    getRowBackground = () => {
      return this.props.idx % 2 ?  "green" : "blue";
    }

    render(): any {
      // here we are just changing the style
      // but we could replace this with anything we liked, cards, images, etc
      // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
      return (<div style={this.getRowStyle()}>
        <Row ref={ node => this.row = node } {...this.props}/>
      </div>);
    }
  }*/