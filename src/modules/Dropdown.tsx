// libraries
import {useRef, useState} from 'react';
import {ControlledMenu, SubMenu, MenuItem, useClick} from '@szhsin/react-menu';

// styles
import '@szhsin/react-menu/dist/index.css';
import "@/styles/modules/dropdown.scss";

const Dropdown = ({button, direction, alignment, gap, options}) => {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const anchorProps = useClick(isOpen, setOpen);

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

export default Dropdown;