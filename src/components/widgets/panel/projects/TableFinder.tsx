// libraries
import {LuListFilter, LuSearch} from "react-icons/lu";

// modules
import TextInput from "@/modules/TextInput.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

const TableFinder = () => {
    return (
        <div className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-5">
            <div className="w-150px">
                <TextInput
                    value={null}
                    placeholder="جستجو"
                    startAdornment={
                        <IconButton
                            color="light"
                            size="sm"
                        >
                            <LuSearch
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    }
                    onChange={(e) => console.log(e.target.value)}
                />
            </div>

            <Button
                color='light'
                startIcon={
                    <LuListFilter
                        size={20}
                        color="currentColor"
                    />
                }
            >
                فیلتر
            </Button>
        </div>
    )
}

export default TableFinder;