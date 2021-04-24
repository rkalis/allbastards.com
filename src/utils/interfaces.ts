export interface ISettings {
  colourfulBackground: boolean;
  displayNumbers: boolean;
}

export interface FilterOption {
  label: string;
  value: number[];
}

export enum HypeType {
  CALM = 'CALM AF (STILL)',
  HYPED = 'HYPED AF (ANIMATED)',
}
