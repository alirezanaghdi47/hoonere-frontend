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
import DatePicker from "@/modules/DatePicker.tsx";

// services
import {readAllAfficheTypeService} from "@/services/publicService.ts";

const AdvanceFilter = ({
                           filter,
                           initialFilter,
                           changeFilter,
                           hideFilter,
                           resetFilter,
                           readAllProjectAfficheAction
                       }) => {

    const readAllAfficheTypeAction = useMutation({
        mutationFn: () => readAllAfficheTypeService(),
    });

    useLayoutEffect(() => {
        readAllAfficheTypeAction.mutate();
    }, []);

    return (
        <div className='row gy-5 w-100'>
            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="شماره آفیش"
                        color="dark"
                        size="sm"
                    />

                    <TextInput
                        id="number_string"
                        name="number_string"
                        value={filter.number_string}
                        onChange={(value) => changeFilter({number_string: value})}
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
                        id="type"
                        name="type"
                        value={filter.type}
                        options={(!readAllAfficheTypeAction.isPending && readAllAfficheTypeAction.data) ? readAllAfficheTypeAction.data?.data?.affiche_types?.map(affiche_type => ({
                            label: affiche_type.title,
                            value: affiche_type.id.toString()
                        })) : []}
                        placeholder=""
                        isSearchable
                        onChange={(value) => changeFilter({type: value})}
                        isLoading={readAllAfficheTypeAction.isPending}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
                <Form.Group>
                    <Form.Label
                        label="تاریخ"
                        color="dark"
                        size="sm"
                    />

                    <DatePicker
                        id="affiche_date"
                        name="affiche_date"
                        value={filter.affiche_date ? filter.affiche_date : ""}
                        onChange={(value) => changeFilter({affiche_date: value})}
                    />
                </Form.Group>
            </div>

            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-end gap-5">
                <Button
                    color='light-danger'
                    onClick={() => {
                        resetFilter();
                        hideFilter();
                        readAllProjectAfficheAction.mutate(initialFilter);
                    }}
                >
                    انصراف
                </Button>

                <Button
                    color='light-info'
                    onClick={() => readAllProjectAfficheAction.mutate(filter)}
                >
                    فیلتر
                </Button>
            </div>
        </div>
    )
}

const SimpleFilter = ({filter, changeFilter, showFilter, readAllProjectAfficheAction}) => {
    return (
        <div className="d-flex flex-wrap justify-content-start align-items-center w-100 gap-5">
            <div className="w-200px">
                <TextInput
                    id="number_string"
                    name="number_string"
                    value={filter.number_string}
                    placeholder="شماره آفیش"
                    startAdornment={
                        <IconButton
                            size="sm"
                            color="light"
                            onClick={() => readAllProjectAfficheAction.mutate(filter)}
                        >
                            <LuSearch
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    }
                    endAdornment={
                        filter.number_string.length > 0 ? (
                            <IconButton
                                size="sm"
                                textColor="danger"
                                onClick={() => {
                                    changeFilter({number_string: ""});
                                    readAllProjectAfficheAction.mutate({...filter, number_string: ""});
                                }}
                            >
                                <LuX
                                    size={20}
                                    color="currentColor"
                                />
                            </IconButton>
                        ) : null
                    }
                    onChange={(value) => changeFilter({number_string: value})}
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
                    readAllProjectAfficheAction,
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
                        readAllProjectAfficheAction={readAllProjectAfficheAction}
                    />
                ) : (
                    <SimpleFilter
                        filter={filter}
                        changeFilter={changeFilter}
                        showFilter={showFilter}
                        readAllProjectAfficheAction={readAllProjectAfficheAction}
                    />
                )
            }
        </div>
    )
}

export default Filter;