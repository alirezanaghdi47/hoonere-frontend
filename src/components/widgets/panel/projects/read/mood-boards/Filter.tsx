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
import {readAllProjectMoodBoardTypeService} from "@/services/publicService.ts";

const AdvanceFilter = ({readAllProjectMoodBoardAction, filter, initialFilter, changeFilter, hideFilter, resetFilter}) => {

    const readAllProjectMoodBoardTypeAction = useMutation({
        mutationFn: () => readAllProjectMoodBoardTypeService(),
    });

    useLayoutEffect(() => {
        readAllProjectMoodBoardTypeAction.mutate();
    }, []);

    return (
        <div className='row gy-5 w-100'>
            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="عنوان"
                        color="dark"
                        size="sm"
                    />

                    <TextInput
                        id="title"
                        name="title"
                        value={filter.title}
                        onChange={(value) => changeFilter({title: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="عنوان شغلی"
                        color="dark"
                        size="sm"
                    />

                    <SelectBox
                        id="type"
                        name="type"
                        value={filter.type}
                        options={readAllProjectMoodBoardTypeAction.data?.data?.moodboards?.map(moodboard => ({
                            label: moodboard.title,
                            value: moodboard.id.toString(),
                        }))}
                        onChange={(value) => changeFilter({type: value})}
                        isLoading={readAllProjectMoodBoardTypeAction.isPending}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-end gap-5">
                <Button
                    color='light-danger'
                    onClick={() => {
                        resetFilter();
                        hideFilter();
                        readAllProjectMoodBoardAction.mutate(initialFilter);
                    }}
                >
                    انصراف
                </Button>

                <Button
                    color='light-info'
                    onClick={() => readAllProjectMoodBoardAction.mutate(filter)}
                >
                    فیلتر
                </Button>
            </div>
        </div>
    )
}

const SimpleFilter = ({readAllProjectMoodBoardAction, filter, changeFilter, showFilter}) => {
    return (
        <div className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-5">
            <div className="w-200px">
                <TextInput
                    id="title"
                    name="title"
                    value={filter.title}
                    placeholder="عنوان"
                    startAdornment={
                        <IconButton
                            size="sm"
                            color="light"
                            onClick={() => readAllProjectMoodBoardAction.mutate(filter)}
                        >
                            <LuSearch
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    }
                    endAdornment={
                        filter.title.length > 0 ? (
                            <IconButton
                                size="sm"
                                textColor="danger"
                                onClick={() => {
                                    changeFilter({title: ""});
                                    readAllProjectMoodBoardAction.mutate({title: ""});
                                }}
                            >
                                <LuX
                                    size={20}
                                    color="currentColor"
                                />
                            </IconButton>
                        ) : null
                    }
                    onChange={(value) => changeFilter({title: value})}
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
                    readAllProjectMoodBoardAction,
                    filter,
                    initialFilter,
                    changeFilter,
                    isOpenFilter,
                    showFilter,
                    hideFilter,
                    resetFilter,
                }) => {
    return (
        <>
            <div className='d-flex flex-column justify-content-start align-items-start w-100 gap-5'>
                {
                    isOpenFilter ? (
                        <AdvanceFilter
                            readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
                            filter={filter}
                            initialFilter={initialFilter}
                            changeFilter={changeFilter}
                            hideFilter={hideFilter}
                            resetFilter={resetFilter}
                        />
                    ) : (
                        <SimpleFilter
                            readAllProjectMoodBoardAction={readAllProjectMoodBoardAction}
                            filter={filter}
                            changeFilter={changeFilter}
                            showFilter={showFilter}
                        />
                    )
                }
            </div>
        </>
    )
}

export default Filter;