export type TColors =
    "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "info"
    | "dark"
    | "light"
    | "white"
    | "muted"
    | "light-primary"
    | "light-danger"
    | "light-success"
    | "light-warning"
    | "light-info"
    | "light-dark"
    | "transparent";

export type TSizes =
    "xxl"
    | "xl"
    | "lg"
    | "md"
    | "sm"
    | "xs"
    | "xxs";

export interface IExtendedFile extends File {
    preview?: string,
}