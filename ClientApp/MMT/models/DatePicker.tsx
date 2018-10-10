import * as React from "react";
import ReactDOM from "react-dom";
import { DatePicker, DayOfWeek, IDatePickerStrings,IDatePickerProps  } from "office-ui-fabric-react/lib/DatePicker";
import "office-ui-fabric-react/lib/components/DatePicker/examples/DatePicker.Examples.scss";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
import { setIconOptions } from "office-ui-fabric-react/lib/Styling";
// suppress icon warnings.
setIconOptions({
  disableWarnings: true
});
const DayPickerStrings: IDatePickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year"
};

export interface IDatePickerBasicState {
  firstDayOfWeek?: DayOfWeek;
  value?: Date | null;
}

export default class DatePickerBasic extends React.Component<{}, IDatePickerBasicState> {
  private myRef : any ;

  public constructor(props: {}) {
    super(props);
    let today: Date = new Date(),
      value: Date = new Date(today.getFullYear(), (today.getMonth() + 1), today.getDate());

      this.state = {
      firstDayOfWeek: DayOfWeek.Sunday,
      value: value
    };

  }

  public render(): JSX.Element {
    const { firstDayOfWeek, value } = this.state;
    const desc: string = "This field is required. One of the support input formats is year dash month dash day.";
    return (
    <DatePicker
        isRequired={false}
        allowTextInput={true}
        ariaLabel={desc}
        firstDayOfWeek={firstDayOfWeek}
        strings={DayPickerStrings}
        value={value!}
        onSelectDate={this._onSelectDate}
        formatDate={this._onFormatDate}
        componentRef={c =>this.myRef = c}
        parseDateFromString={this._onParseDateFromString}
      />
    );
  }

  private _onSelectDate = (date: Date | null | undefined): void => {
    if(this.state.value.getTime() === date.getTime()) {
      return;
    }
    // this.myRef is an ReactComponent... Here this will be converted the Html Node
      this.setState({ value: date });
        var element :any =ReactDOM.findDOMNode(this.myRef);
        var tzu :any = element.getElementsByClassName("ms-TextField-field")[0];
        tzu.style.color = "red";
  }

  private _onFormatDate = (date?: Date): string => {
    if (date === undefined) {
      return "";
    } else {
      return date.getDate() + "." + (date.getMonth() + 1) + "." + (date.getFullYear() % 100);
    }
  }

  private _onParseDateFromString = (value: string): Date => {
    const date: Date = this.state.value || new Date();
    const values: string[] = (value || "").trim().split(".");
    const day: number = values.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
    const month: number = values.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
    let year: number = values.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
    if (year < 100) {
      year += date.getFullYear() - (date.getFullYear() % 100);
    }
    return new Date(year, month, day);
  }
}

