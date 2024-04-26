// libraries
import {useRef, useState} from 'react';
import {ControlledMenu, SubMenu, MenuItem , MenuRadioGroup, useHover , useClick} from '@szhsin/react-menu';

// styles
import '@szhsin/react-menu/dist/index.css';
import "@/styles/modules/dropdown.scss";

const ClickableDropdown = ({value , onChange ,button , options , alignment , direction}) => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(true);
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
                gap={8}
            >
                <MenuRadioGroup
                    value={value}
                    onRadioChange={(e) => onChange(e.value)}
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
                                                    type="radio"
                                                    value={subItem.value}
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
                                        type="radio"
                                        value={item.value}
                                    >
                                        {item.label}
                                    </MenuItem>
                                )
                            }
                        })
                    }
                </MenuRadioGroup>
            </ControlledMenu>
        </>
    )
}

const HoverableDropdown = ({button , options , alignment , direction}) => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(true);
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
                gap={8}
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

const Dropdown = ({value , onChange , button, direction, alignment, options , isHoverable}) => {
    if (isHoverable){
        return (
            <HoverableDropdown
                value={value}
                onChange={value => onChange(value)}
                button={button}
                options={options}
                direction={direction}
                alignment={alignment}
            />
        )
    } else {
        return (
            <ClickableDropdown
                value={value}
                onChange={value => onChange(value)}
                button={button}
                options={options}
                direction={direction}
                alignment={alignment}
            />
        )
    }
}

export default Dropdown;