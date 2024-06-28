// libraries
import {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

// components
import ScreenPlays from "@/components/widgets/panel/projects/read/affiches/create/ScreenPlays.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

// modules
import Button from "@/modules/Button.tsx";

// services
import {readAllProjectScreenPlayService} from "@/services/projectScreenPlayService.ts";

// types
import {IReadAllProjectScreenPlay} from "@/types/serviceType.ts";
import Empty from "@/components/partials/panel/Empty.tsx";

const FormDataP3 = ({createProjectAfficheP3Form, prevStep}) => {
    const params = useParams();

    const {
        filter,
        initialFilter,
        isOpenFilter,
        showFilter,
        hideFilter,
        resetFilter,
        changeFilter
    } = useFilter<IReadAllProjectScreenPlay>({
        text: "",
        part: "",
        sequence: "",
        page: 1,
        per_page: 12,
    });

    const readAllProjectScreenPlayAction = useMutation({
        mutationFn: (data: IReadAllProjectScreenPlay) => readAllProjectScreenPlayService({
            ...data,
            project_id: params.id
        }),
    });

    useLayoutEffect(() => {
        readAllProjectScreenPlayAction.mutate(filter);
    }, []);

    return (
        <div className="row gy-5 w-100">
            <div className="col-12 d-flex flex-column justify-content-start align-items-center gap-5">
                {
                    readAllProjectScreenPlayAction.isPending && (
                        <Loading
                            width="100%"
                            height={300}
                        />
                    )
                }

                {
                    !readAllProjectScreenPlayAction.isPending && readAllProjectScreenPlayAction.data?.data.screenplays.length > 0 && (
                        <>
                            <div className="row gy-5 w-100">
                                <div className="col-12">
                                    <ScreenPlays
                                        readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                                        createProjectAfficheP3Form={createProjectAfficheP3Form}
                                        filter={filter}
                                        changeFilter={changeFilter}
                                    />
                                </div>
                            </div>

                            <div className="row gy-5 w-100">
                                <div className="col-12 d-flex justify-content-end align-items-center gap-5">
                                    <Button
                                        color="light-danger"
                                        onClick={prevStep}
                                    >
                                        قبلی
                                    </Button>

                                    <Button
                                        color="success"
                                        onClick={createProjectAfficheP3Form.handleSubmit}
                                    >
                                        افزودن آفیش
                                    </Button>
                                </div>
                            </div>
                        </>
                    )
                }

                {
                    !readAllProjectScreenPlayAction.isPending && readAllProjectScreenPlayAction.data?.data.screenplays.length === 0 && (
                        <Empty
                            title="فیلم نامه ای یافت نشد"
                            width="100%"
                            height={300}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default FormDataP3;