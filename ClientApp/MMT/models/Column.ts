export default class Column implements AdazzleReactDataGrid.Column {
    key: string;
    name : string;
    editable? : boolean;
    sortable? :boolean;
    editor? :JSX.Element;
    events? :{
        [name: string]: AdazzleReactDataGrid.ColumnEventCallback;
    } | undefined;
    formatter?: React.ReactElement<any> | React.ComponentClass<any> | React.StatelessComponent<any>;
    resizable?:boolean;
    width?:number;

    constructor(_key: string , _name : string,_resizable? : boolean,_sortable? : boolean,
         _editable? : boolean,_editor? : JSX.Element ,_events?:{
            [name: string]: AdazzleReactDataGrid.ColumnEventCallback;
        } | undefined,_formatter? : React.ReactElement<any>,
        _width? : number) {
        this.key = _key;
        this.name = _name;
        this.sortable = _sortable;
        this.editable = _editable;
        this.editor = _editor;
        this.formatter = _formatter;
        this.resizable=_resizable;
        this.events=_events;
    }
}