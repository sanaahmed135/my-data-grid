import Project from "../models/project";

export interface IAuswahlProps {
    collection: Array<Project>;
    onAuswahl : (selectedProject : string) => void;
  }