// libraries
import {CSSProperties, HTMLProps, ReactNode} from "react";
import {DateObject} from "react-multi-date-picker";
import {FormikErrors, FormikTouched} from "formik";

// types
import * as t from "@/types/global.ts";

export type TAlert = {
    color: t.colors,
    size?: t.sizes,
    icon?: ReactNode,
    message: string,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TAvatarInput = {
    id: string,
    name: string,
    value: t.ExtendedFile | null,
    preview?: string | null,
    onChange?: (value: File | object) => void,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TBadge = {
    color: t.colors,
    size: "sm" | "lg",
    label: string,
    placement: "top-end" | "top-start" | "bottom-end" | "bottom-start",
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TBreadcrumbs = {
    links: { id: number, label: string, href: string }[],
    activeLink: string,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TButton = {
    children: ReactNode,
    size?: t.sizes,
    direction?: "center" | "start" | "end",
    color?: t.colors,
    activeColor?: t.colors,
    bgColor?: t.colors,
    textColor?: t.colors,
    href?: string,
    startAdornment?: ReactNode,
    endAdornment?: ReactNode,
    isBold?: boolean,
    isDense?: boolean,
    fullWidth?: boolean,
    isLoading?: boolean,
    disabled?: boolean,
    onClick?: () => void,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TCheckBox = {
    id: string,
    name: string,
    checked: boolean,
    value: string | number | null,
    onChange?: (value: string | number | null) => string | number | null | void,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TChip = {
    label: string,
    size?: "sm" | "lg",
    color: t.colors,
    isCircle?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TCodeInput = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    onChange?: (value: string | null) => void,
    startAdornment?: ReactNode,
    onResend: () => void,
    disabled?: boolean,
    style?: CSSProperties
}

export type TDatePicker = {
    id: string,
    name: string,
    value: string | null,
    onChange?: (value: DateObject | DateObject[] | null) => void,
    minDate?: string | null,
    maxDate?: string | null,
    range?: boolean,
    disabled?: boolean,
    readOnly?: boolean,
    holidayDates?: string[]
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TDropdown = {
    button: ReactNode,
    direction: "right" | "left" | "top" | "bottom",
    alignment: "start" | "center" | "end",
    gap: number,
    options: {
        id: number,
        label: string,
        onClick: () => void,
        children?: { id: number, label: string, onClick: () => void }[]
    }[],
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TFileInput = {
    id: string,
    name: string,
    value: t.ExtendedFile | null,
    preview?: string | null,
    onChange?: (value: File | object) => void,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TFormGroup = {
    children: ReactNode,
    inline?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TFormLabel = {
    label: string,
    size: t.sizes,
    color: t.colors,
    required?: boolean,
    isBold?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TFormError = {
    error: any,
    touched: any,
    style?: CSSProperties
}

export type TIconButton = {
    children: ReactNode,
    size?: t.sizes,
    color?: t.colors,
    activeColor?: t.colors,
    bgColor?: t.colors,
    textColor?: t.colors,
    href?: string,
    isDense?: boolean,
    isLoading?: boolean,
    disabled?: boolean,
    onClick?: (e) => void,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties,
}

export type TLocationPicker = {
    width?: string | number,
    height: number,
    location?: [number, number]
    setLocation?: (data: { lat: number, lon: number }) => void,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties,
}

export type TModal = {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void,
    width?: "sm" | "md" | "lg" | "full",
    height?: "content" | "full",
    position?: "any" | "center" | "bottom",
    className?: {
        content: HTMLProps<HTMLElement>["className"],
        overlay: HTMLProps<HTMLElement>["className"]
    },
    style?: CSSProperties
}

export type TModalHeader = {
    title: string,
    onClose: () => void,
    className?: {
        content: HTMLProps<HTMLElement>["className"],
        overlay: HTMLProps<HTMLElement>["className"]
    },
    style?: CSSProperties
}

export type TModalBody = {
    children: ReactNode,
    isCenter?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TModalFooter = {
    cancelButton: ReactNode,
    submitButton: ReactNode,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TNumberInput = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    options?: unknown,
    onChange?: (value: string | null) => void,
    startAdornment?: ReactNode,
    endAdornment?: ReactNode,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TPagination = {
    current: number,
    pageSize: number,
    total: number,
    onChange?: (value: number) => void,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TPasswordInput = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    onChange?: (value: string | null) => void,
    startAdornment?: ReactNode,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TPopover = {
    children: ReactNode,
    content: ReactNode,
    trigger: ("click" | "hover")[],
    position: 'top left' | 'top right' | 'bottom right' | 'bottom left' | 'right center' | 'left center' | 'top center' | 'bottom center' | 'center center'
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TRadioBox = {
    id: string,
    name: string,
    value: string | null,
    onChange?: (value: string | null) => string | null | void,
    checked: boolean,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TSelectBox = {
    id: string,
    name: string,
    value: string | null,
    onChange?: (e: string | null) => void,
    options: { label: string, value: string | number }[]
    placeholder?: string,
    isSearchable?: boolean,
    isLoading?: boolean,
    isMulti?: boolean,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TStepper = {
    steps: { label: string }[],
    activeStep: number
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TSwitchBox = {
    id: string,
    name: string,
    value: string | number | null,
    onChange?: (value: boolean) => boolean | void,
    checked: boolean,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTable = {
    data: unknown,
    columns: unknown,
    style?: CSSProperties
}

export type TTabs = {
    children: ReactNode,
    variant?: "link" | "pill",
    isVertical?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTabsItem = {
    label: string,
    isActive?: boolean,
    onClick: () => void
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTagInput = {
    id: string,
    name: string,
    value: string[] | null,
    placeholder?: string,
    onChange?: (value: string[] | null) => string[] | null,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTextarea = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    onChange?: (value: string | null) => void,
    rows?: number,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTextEditor = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    onChange?: (value: string | null) => string | null,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTextInput = {
    id: string,
    name: string,
    value: string | null,
    placeholder?: string,
    onChange?: (value: string | null) => void,
    onBlur?: (value: string | null) => void,
    startAdornment?: ReactNode
    endAdornment?: ReactNode,
    isLoading?: boolean,
    disabled?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTimePicker = {
    id: string,
    name: string,
    value: string | null,
    onChange?: (value: DateObject | DateObject[] | null) => string | null,
    disabled?: boolean,
    readOnly?: boolean,
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}

export type TTypography = {
    children: ReactNode,
    variant?: "p" | "h1" | "h2" | "h3" | "h4" | "span"
    size: t.sizes,
    color: t.colors,
    isBold?: boolean,
    truncate?: 1 | 2 | 3,
    lineHeight?: "sm" | "lg",
    className?: HTMLProps<HTMLElement>["className"],
    style?: CSSProperties
}