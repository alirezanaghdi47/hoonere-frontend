// libraries
import {useRef, useState} from 'react';
import {ControlledMenu, SubMenu, MenuItem, useHover , useClick} from '@szhsin/react-menu';

// styles
import '@szhsin/react-menu/dist/index.css';
import "@/styles/modules/dropdown.scss";

const ClickableDropdown = ({button , options , alignment , direction , gap}) => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const anchorProps  = useClick(isOpen, setOpen);

    return (
        <>
            <div
                ref={ref}
                {...anchorProps}
                className="d-inline-block"
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

const HoverableDropdown = ({button , options , alignment , direction , gap}) => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const {anchorProps, hoverProps} = useHover(isOpen, setOpen);

    return (
        <>
            <div
                ref={ref}
                {...anchorProps}
                className="d-inline-block"
            >
                {button}
            </div>

            <ControlledMenu
                {...hoverProps}
                state={isOpen ? "open" : "closed"}
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

const Dropdown = ({button, direction, alignment , gap, options , isHoverable}) => {
    if (isHoverable){
        return (
            <HoverableDropdown
                button={button}
                options={options}
                direction={direction}
                alignment={alignment}
                gap={gap}
            />
        )
    } else {
        return (
            <ClickableDropdown
                button={button}
                options={options}
                direction={direction}
                alignment={alignment}
                gap={gap}
            />
        )
    }
}

export default Dropdown;