export type colors =
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

export type sizes =
    "xxl"
    | "xl"
    | "lg"
    | "md"
    | "sm"
    | "xs"
    | "xxs";

export interface ExtendedFile extends File {
    preview?: string,
}