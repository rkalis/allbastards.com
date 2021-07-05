export interface ISettings {
  colourfulBackground: boolean;
  displayNumbers: boolean;
}

export interface FilterOption {
  label: string;
  value: number[];
}

export interface ActiveFilters {
  [attribute: string]: FilterOption[];
}

export interface FilterSpecification {
  attribute: string;
  options: FilterOption[];
}

export enum HypeType {
  CALM = 'CALM AF (STILL)',
  HYPED = 'HYPED AF (ANIMATED)',
}
