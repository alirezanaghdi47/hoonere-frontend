// libraries
import {useParams} from "react-router-dom";
import {LuSearch, LuX} from "react-icons/lu";

// modules
import TextInput from "@/modules/TextInput";
import IconButton from "@/modules/IconButton";
import Button from "@/modules/Button";
import Form from "@/modules/Form";
import DatePicker from "@/modules/DatePicker";

const AdvanceFilter = ({
                           filter,
                           initialFilter,
                           changeFilter,
                           hideFilter,
                           resetFilter,
                           readAllProjectContractInsertionAction
                       }) => {
    const params = useParams();

    return (
        <div className='row gy-5 w-100'>
            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="شماره الحاقیه"
                        color="dark"
                        size="sm"
                    />

                    <TextInput
                        id="insertion_number"
                        name="insertion_number"
                        value={filter.insertion_number}
                        onChange={(value) => changeFilter({insertion_number: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="تاریخ شروع"
                        color="dark"
                        size="sm"
                    />

                    <DatePicker
                        id="start_date"
                        name="start_date"
                        value={filter.start_date}
                        onChange={(value) => changeFilter({start_date: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="تاریخ پایان"
                        color="dark"
                        size="sm"
                    />

                    <DatePicker
                        id="end_date"
                        name="end_date"
                        value={filter.end_date}
                        onChange={(value) => changeFilter({end_date: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-end gap-5">
                <Button
                    color='light-danger'
                    onClick={() => {
                        resetFilter();
                        hideFilter();
                        readAllProjectContractInsertionAction.mutate({
                            ...initialFilter,
                            project_id: params.id,
                            contract_id: params.subId
                        });
                    }}
                >
                    انصراف
                </Button>

                <Button
                    color='light-info'
                    onClick={() => readAllProjectContractInsertionAction.mutate({
                        ...filter,
                        project_id: params.id,
                        contract_id: params.subId
                    })}
                >
                    فیلتر
                </Button>
            </div>
        </div>
    )
}

const SimpleFilter = ({filter, changeFilter, showFilter, readAllProjectContractInsertionAction}) => {
    const params = useParams();

    return (
        <div className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-5">
            <div className="w-200px">
                <TextInput
                    id="insertion_number"
                    name="insertion_number"
                    value={filter.insertion_number}
                    placeholder="شماره الحاقیه"
                    startAdornment={
                        <IconButton
                            size="sm"
                            color="light"
                            onClick={() => readAllProjectContractInsertionAction.mutate({
                                ...filter,
                                project_id: params.id,
                                contract_id: params.subId
                            })}
                        >
                            <LuSearch
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    }
                    endAdornment={
                        filter.insertion_number.length > 0 ? (
                            <IconButton
                                size="sm"
                                textColor="danger"
                                onClick={() => {
                                    changeFilter({insertion_number: ""});
                                    readAllProjectContractInsertionAction.mutate({
                                        ...filter,
                                        insertion_number: "",
                                        project_id: params.id,
                                        contract_id: params.subId
                                    });
                                }}
                            >
                                <LuX
                                    size={20}
                                    color="currentColor"
                                />
                            </IconButton>
                        ) : null
                    }
                    onChange={(value) => changeFilter({insertion_number: value})}
                />
            </div>

            <Button
                color='light-info'
                onClick={showFilter}
            >
                فیلتر پیشرفته
            </Button>
        </div>
    )
}

const Filter = ({
                    readAllProjectContractInsertionAction,
                    filter,
                    initialFilter,
                    changeFilter,
                    isOpenFilter,
                    showFilter,
                    hideFilter,
                    resetFilter
                }) => {
    return (
        <div className='d-flex flex-column justify-content-start align-items-start w-100 gap-5'>
            {
                isOpenFilter ? (
                    <AdvanceFilter
                        filter={filter}
                        initialFilter={initialFilter}
                        changeFilter={changeFilter}
                        hideFilter={hideFilter}
                        resetFilter={resetFilter}
                        readAllProjectContractInsertionAction={readAllProjectContractInsertionAction}
                    />
                ) : (
                    <SimpleFilter
                        filter={filter}
                        changeFilter={changeFilter}
                        showFilter={showFilter}
                        readAllProjectContractInsertionAction={readAllProjectContractInsertionAction}
                    />
                )
            }
        </div>
    )
}

export default Filter;