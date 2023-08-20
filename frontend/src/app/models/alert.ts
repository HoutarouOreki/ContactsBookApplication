export interface Alert {
    message: string,
    type: AlertTypes,
}

export enum AlertTypes {
    default = "primary",
    success = "success",
    warning = "warning",
    error = "danger",
}