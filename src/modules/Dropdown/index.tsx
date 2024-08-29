// libraries
import {CSSProperties, HTMLProps, ReactNode, useRef, useState} from 'react';
import {ControlledMenu, SubMenu, MenuItem, useClick} from '@szhsin/react-menu';
import classNames from "classnames";

// styles
import '@szhsin/react-menu/dist/index.css';
import "./index.style.scss";

const Dropdown = ({button, direction, alignment, gap, options , ...props}: TDropdown) => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const anchorProps = useClick(isOpen, setOpen);

    return (
        <>
            <div
                ref={ref}
                {...anchorProps}
                className={classNames("d-inline-block" , props.className)}
            >
                {button}
            </div>

            <ControlledMenu
                state={isOpen ? 'open' : 'closed'}
                anchorRef={ref}
                onClose={() => setOpen(false)}
                align={alignment}
                direction={direction}
                gap={gap}
            >
                {
                    options.map(item => {
                        if (item.hasOwnProperty("children")) {
                            return (
                                <SubMenu
                                    key={item.id}
                                    label={item.label}
                                >
                                    {
                                        item?.children?.map(subItem =>
                                            <MenuItem
                                                key={subItem.id}
                                                onClick={subItem.onClick}
                                            >
                                                {subItem.label}
                                            </MenuItem>
                                        )
                                    }
                                </SubMenu>
                            )
                        } else {
                            return (
                                <MenuItem
                                    key={item.id}
                                    onClick={item.onClick}
                                >
                                    {item.label}
                                </MenuItem>
                            )
                        }
                    })
                }
            </ControlledMenu>
        </>
    )
}

type TDropdown = {
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

export default Dropdown;