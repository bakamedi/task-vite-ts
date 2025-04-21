export enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export interface StatusIE {
  status: Status;
}
