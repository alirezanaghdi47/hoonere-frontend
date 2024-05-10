// libraries
import {LuListFilter, LuSearch} from "react-icons/lu";

// modules
import TextInput from "@/modules/TextInput.tsx";
import Button from "@/modules/Button.tsx";
import IconButton from "@/modules/IconButton.tsx";

const AdvanceFilterBar = ({filter , changeFilter , resetFilter}) => {
    return (
        <>
            <div className="separator separator-dashed my-5"/>

            <div className="row g-5">
                <div className="col-lg-6">
                    6
                </div>
                <div className="col-lg-6">
                    6
                </div>
            </div>
        </>
    )
}

const FilterBar = ({isOpenFilter, filter, changeFilter, resetFilter, toggleFilter}) => {
    // ===== formik
    return (
        <div className='card w-100'>
            <div className="card-body">
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
                        color={isOpenFilter ? 'info' : 'light-read'}
                        startIcon={
                            <LuListFilter
                                size={20}
                                color="currentColor"
                            />
                        }
                        onClick={toggleFilter}
                    >
                        فیلتر
                    </Button>
                </div>

                {
                    isOpenFilter && (
                        <AdvanceFilterBar
                            filter={filter}
                            changeFilter={changeFilter}
                            resetFilter={resetFilter}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default FilterBar;