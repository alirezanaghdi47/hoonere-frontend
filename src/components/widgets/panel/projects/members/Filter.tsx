// libraries
import {useMutation} from "@tanstack/react-query";
import {LuSearch, LuX} from "react-icons/lu";

// modules
import TextInput from "@/modules/TextInput.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Button from "@/modules/Button.tsx";
import Form from "@/modules/Form.tsx";
import SelectBox from "@/modules/SelectBox.tsx";
import Tooltip from "@/modules/Tooltip.tsx";

// services
import {readAllJobService, readAllProjectTypeService, readAllUserStatusService} from "@/services/publicService.ts";

const AdvanceFilter = ({readAllProjectMemberAction , filter, initialFilter, changeFilter, hideFilter, resetFilter}) => {
    const readAllProjectTypeAction = useMutation({
        mutationFn: () => readAllProjectTypeService(),
    });

    const readAllJobAction = useMutation({
        mutationFn: () => readAllJobService(),
    });

    const readAllUserStatusAction = useMutation({
        mutationFn: () => readAllUserStatusService(),
    });

    // useLayoutEffect(() => {
    //     readAllJobAction.mutate();
    //     readAllUserStatusAction.mutate();
    //     readAllProjectTypeAction.mutate();
    // }, []);

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
                        label="گروه شغلی"
                        color="dark"
                        size="sm"
                    />

                    <SelectBox
                        id="foa_parent_id"
                        name="foa_parent_id"
                        value={filter.foa_parent_id}
                        options={(!readAllJobAction.isPending && readAllJobAction.data) ? readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id === null)?.map(item => ({
                            label: item.title,
                            value: item.id.toString()
                        })) : []}
                        placeholder=""
                        isSearchable
                        onChange={(value) => changeFilter({foa_parent_id: value})}
                        isLoading={readAllJobAction.isPending}
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
                        id="foa_child_id"
                        name="foa_child_id"
                        value={filter.foa_child_id}
                        disabled={!filter.foa_parent_id}
                        options={(!readAllJobAction.isPending && readAllJobAction.data) ? readAllJobAction.data?.data?.fieldsOfActivity?.filter(foa => foa.parent_id !== null && foa.parent_id.toString() === filter.foa_parent_id)?.map(item => ({
                            label: item.title,
                            value: item.id.toString()
                        })) : []}
                        placeholder=""
                        isSearchable
                        onChange={(value) => changeFilter({foa_child_id: value})}
                        isLoading={readAllJobAction.isPending}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-end gap-5">
                <Button
                    color='light-danger'
                    onClick={() => {
                        resetFilter();
                        hideFilter();
                        readAllProjectMemberAction.mutate(initialFilter);
                    }}
                >
                    انصراف
                </Button>

                <Button
                    color='light-info'
                    onClick={() => readAllProjectMemberAction.mutate(filter)}
                >
                    فیلتر
                </Button>
            </div>
        </div>
    )
}

const SimpleFilter = ({readAllProjectMemberAction , filter, changeFilter, showFilter}) => {
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
                            onClick={() => readAllProjectMemberAction.mutate(filter)}
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
                                    readAllProjectMemberAction.mutate({...filter, text: ""});
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
                    readAllProjectMemberAction,
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
            <div className='d-flex flex-column justify-content-start align-items-start w-100 gap-5 mb-5'>
                {
                    isOpenFilter ? (
                        <AdvanceFilter
                            readAllProjectMemberAction={readAllProjectMemberAction}
                            filter={filter}
                            initialFilter={initialFilter}
                            changeFilter={changeFilter}
                            hideFilter={hideFilter}
                            resetFilter={resetFilter}
                        />
                    ) : (
                        <SimpleFilter
                            readAllProjectMemberAction={readAllProjectMemberAction}
                            filter={filter}
                            changeFilter={changeFilter}
                            showFilter={showFilter}
                        />
                    )
                }
            </div>

            <Tooltip/>
        </>
    )
}

export default Filter;