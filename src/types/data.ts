export enum ReactLevels {
  Warning = "warning",
  Critical = "critical",
  None = "none",
}

export enum Tags {
  Alpha = "альфа",
  Beta = "бета",
  Gamma = "гамма",
  Omega = "омега",
  Sigma = "сигма",
}

export type DataItem = {
  id: number;
  title: string | null;
  description: string | null;
  reactLevel: ReactLevels;
  enabled: boolean | null;
  dttmCreated: string | null;
  tags: Tags[];
};

export type ResponseData = {
  items: DataItem[];
};

export type Response = {
  success: boolean;
  message: string;
  data: ResponseData;
};
