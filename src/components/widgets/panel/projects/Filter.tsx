// libraries
import {useLayoutEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {LuSearch, LuX} from "react-icons/lu";

// modules
import TextInput from "@/modules/TextInput.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Button from "@/modules/Button.tsx";
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";

// services
import {readAllProjectTypeService} from "@/services/publicService.ts";

const AdvanceFilter = ({filter, initialFilter, changeFilter, hideFilter, resetFilter, readAllProjectAction}) => {
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
                        value={filter.text}
                        onChange={(value) => changeFilter({text: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="نوع"
                        color="dark"
                        size="sm"
                    />

                    <SelectBox
                        name="type_id"
                        value={filter.type_id}
                        options={(!readAllProjectTypeAction.isPending && readAllProjectTypeAction.data) ? readAllProjectTypeAction.data?.data?.projectTypes?.map(projectType => ({
                            label: projectType.title,
                            value: projectType.id.toString()
                        })) : []}
                        placeholder=""
                        isSearchable
                        onChange={(value) => changeFilter({type_id: value})}
                        isLoading={readAllProjectTypeAction.isPending}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-end gap-5">
                <Button
                    color='light-danger'
                    onClick={() => {
                        resetFilter();
                        hideFilter();
                        readAllProjectAction.mutate(initialFilter);
                    }}
                >
                    انصراف
                </Button>

                <Button
                    color='light-info'
                    onClick={() => readAllProjectAction.mutate(filter)}
                >
                    فیلتر
                </Button>
            </div>
        </div>
    )
}

const SimpleFilter = ({filter, changeFilter, showFilter, readAllProjectAction}) => {
    return (
        <div className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-5">
            <div className="w-200px">
                <TextInput
                    value={filter.text}
                    placeholder="جستجو"
                    startAdornment={
                        <IconButton
                            size="sm"
                            color="light"
                            onClick={() => readAllProjectAction.mutate(filter)}
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
                                    readAllProjectAction.mutate({...filter , text: ""});
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
                    readAllProjectAction,
                    filter,
                    initialFilter,
                    changeFilter,
                    isOpenFilter,
                    showFilter,
                    hideFilter,
                    resetFilter
                }) => {
    return (
        <div className='d-flex flex-column justify-content-start align-items-start w-100 gap-5 mb-5'>
            {
                isOpenFilter ? (
                    <AdvanceFilter
                        filter={filter}
                        initialFilter={initialFilter}
                        changeFilter={changeFilter}
                        hideFilter={hideFilter}
                        resetFilter={resetFilter}
                        readAllProjectAction={readAllProjectAction}
                    />
                ) : (
                    <SimpleFilter
                        filter={filter}
                        changeFilter={changeFilter}
                        showFilter={showFilter}
                        readAllProjectAction={readAllProjectAction}
                    />
                )
            }
        </div>
    )
}

export default Filter;