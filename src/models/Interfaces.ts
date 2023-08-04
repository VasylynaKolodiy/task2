import {ReactNode} from "react";

export interface INote {
  id: number,
  name: string,
  created: string,
  category: string,
  content: string,
  dates: string,
  archived: boolean,
  [key: string]: any
}

export interface ICell {
  attr: string;
  title: string;
  node?: {
    head: ReactNode;
    body: (row: any) => ReactNode;
  };
}

export interface ICategory {
  id: string,
  [key: string]: any
}

export interface ISummaryObj {
  title: string,
  archivedCount: number,
  activeCount: number,
  [key: string]: any

}

export interface ISummary {
  [key: string]: ISummaryObj
}
