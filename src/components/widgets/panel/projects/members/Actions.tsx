// libraries
import {LuList, LuTable} from "react-icons/lu";

// modules
import IconButton from "@/modules/IconButton.tsx";

const Actions = ({isListView , toggleView}) => {
    return (
        <div className="d-flex flex-wrap justify-content-end align-items-center gap-2 w-100">
            <IconButton
                color="light-dark"
                className="ms-auto"
                onClick={toggleView}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={isListView ? "نمایش جدولی" : "نمایش لیستی"}
            >
                {
                    isListView ? (
                        <LuTable
                            size={20}
                            color="currentColor"
                        />
                    ) : (
                        <LuList
                            size={20}
                            color="currentColor"
                        />
                    )
                }
            </IconButton>
        </div>
    )
}

export default Actions;