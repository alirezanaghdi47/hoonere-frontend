// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LuSearch, LuX} from "react-icons/lu";

// modules
import TextInput from "@/modules/TextInput";
import IconButton from "@/modules/IconButton";
import Button from "@/modules/Button";
import Form from "@/modules/Form";
import NumberInput from "@/modules/NumberInput";

// services
import {readAllProjectTypeService} from "@/services/publicService.ts";

const AdvanceFilter = ({
                           filter,
                           initialFilter,
                           changeFilter,
                           hideFilter,
                           resetFilter,
                           readAllProjectScreenPlayAction
                       }) => {
    const params = useParams();

    const readAllProjectTypeAction = useMutation({
        mutationFn: () => readAllProjectTypeService(),
    });

    useLayoutEffect(() => {
        readAllProjectTypeAction.mutate();
    }, []);

    return (
        <div className='row gy-5 w-100'>
            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="جستجو"
                        color="dark"
                        size="sm"
                    />

                    <TextInput
                        id="text"
                        name="text"
                        value={filter.text}
                        onChange={(value) => changeFilter({text: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="قسمت"
                        color="dark"
                        size="sm"
                    />

                    <NumberInput
                        id="part"
                        name="part"
                        value={filter.part}
                        onChange={(value) => changeFilter({part: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="سکانس"
                        color="dark"
                        size="sm"
                    />

                    <NumberInput
                        id="sequence"
                        name="sequence"
                        value={filter.sequence}
                        onChange={(value) => changeFilter({sequence: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-end gap-5">
                <Button
                    color='light-danger'
                    onClick={() => {
                        resetFilter();
                        hideFilter();
                        readAllProjectScreenPlayAction.mutate({
                            ...initialFilter,
                            project_id: params.id
                        });
                    }}
                >
                    انصراف
                </Button>

                <Button
                    color='light-info'
                    onClick={() => readAllProjectScreenPlayAction.mutate({
                        ...filter,
                        project_id: params.id
                    })}
                >
                    فیلتر
                </Button>
            </div>
        </div>
    )
}

const SimpleFilter = ({filter, changeFilter, showFilter, readAllProjectScreenPlayAction}) => {
    const params = useParams();

    return (
        <div className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-5">
            <div className="w-200px">
                <TextInput
                    id="text"
                    name="text"
                    value={filter.text}
                    placeholder="جستجو"
                    startAdornment={
                        <IconButton
                            size="sm"
                            color="light"
                            onClick={() => readAllProjectScreenPlayAction.mutate({
                                ...filter,
                                project_id: params.id
                            })}
                        >
                            <LuSearch
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    }
                    endAdornment={
                        filter.text.length > 0 ? (
                            <IconButton
                                size="sm"
                                textColor="danger"
                                onClick={() => {
                                    changeFilter({text: ""});
                                    readAllProjectScreenPlayAction.mutate({
                                        ...filter,
                                        text: "",
                                        project_id: params.id
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
                    onChange={(value) => changeFilter({text: value})}
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
                    readAllProjectScreenPlayAction,
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
                        readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                    />
                ) : (
                    <SimpleFilter
                        filter={filter}
                        changeFilter={changeFilter}
                        showFilter={showFilter}
                        readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                    />
                )
            }
        </div>
    )
}

export default Filter;