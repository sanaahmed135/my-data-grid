import Project from "../models/project";

export interface IAuswahlProps {
    collection: Array<Project> | null;
    onAuswahl : (selectedProject : string) => void;
  }