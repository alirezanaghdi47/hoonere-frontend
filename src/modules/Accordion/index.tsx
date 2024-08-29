// libraries
import {ReactNode} from "react";
import {Accordion as ReactAccordion, AccordionItem as ReactAccordionItem} from '@szhsin/react-accordion';
import {LuChevronDown} from "react-icons/lu";

// modules
import Typography from "@/modules/Typography";

// styles
import "./index.style.scss";

const ReactAccordionHeader = ({title, number, startAdornment, endAdornment}: {
    title: string,
    number?: ReactNode,
    startAdornment?: ReactNode,
    endAdornment?: ReactNode
}) => {
    return (
        <div
            className="d-flex justify-content-between align-items-center gap-x-5 w-100 border border-dashed border-secondary rounded-2 p-5">
            <div className='d-flex justify-content-start align-items-center gap-5'>
                {
                    startAdornment && (
                        <span className="d-flex justify-content-center align-items-center w-max h-max">
                            {startAdornment}
                        </span>
                    )
                }

                {
                    number && (
                        <Typography
                            size="sm"
                            color="muted"
                            isBold
                        >
                            {number}
                        </Typography>
                    )
                }

                <Typography
                    size="sm"
                    color="muted"
                    isBold
                >
                    {title}
                </Typography>
            </div>

            <div className='d-flex justify-content-end align-items-center gap-5'>
                {
                    endAdornment && (
                        <span className="d-flex justify-content-center align-items-center w-max h-max">
                            {endAdornment}
                        </span>
                    )
                }

                <LuChevronDown
                    size={20}
                    className="text-gray-600"
                />
            </div>
        </div>
    )
}

export const Accordion = ({children, allowMultiple = false}: TAccordion) => {
    return (
        <ReactAccordion
            allowMultiple={allowMultiple}
            mountOnEnter
            unmountOnExit
            transition
            transitionTimeout={300}
        >
            {children}
        </ReactAccordion>
    )
}

const AccordionItem = ({
                           children,
                           title,
                           number,
                           startAdornment = null,
                           endAdornment = null,
                           disabled = false,
                           initialEntered
                       }: TAccordionItem) => {
    return (
        <ReactAccordionItem
            initialEntered={initialEntered}
            header={ReactAccordionHeader({title, number, startAdornment, endAdornment})}
            panelProps={{datatype: "accordion"}}
            disabled={disabled}
        >
            {children}
        </ReactAccordionItem>
    )
}

Accordion.Item = AccordionItem;

type TAccordion = {
    children: ReactNode,
    allowMultiple?: boolean
}

type TAccordionItem = {
    children: ReactNode,
    title: string,
    number?: string | number,
    startAdornment?: ReactNode,
    endAdornment?: ReactNode,
    disabled?: boolean,
    initialEntered?: boolean
}

export default Accordion;