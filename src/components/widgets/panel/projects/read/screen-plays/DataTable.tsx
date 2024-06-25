// libraries
import {useMemo} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns-jalali";
import {LuPen, LuTrash2} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/read/screen-plays/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/screen-plays/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// helpers
import dialog from "@/helpers/dialog.tsx";
import toast from "@/helpers/toast.tsx";

// modules
import Table from "@/modules/Table.tsx";
import Tooltip from "@/modules/Tooltip.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Chip from "@/modules/Chip.tsx";

// services
import {deleteProjectScreenPlayService} from "@/services/projectScreenPlayService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IDeleteProjectScreenPlay} from "@/types/serviceType.ts";

const DataTable = ({
                       readAllProjectScreenPlayAction,
                       filter,
                       initialFilter,
                       isOpenFilter,
                       changeFilter,
                       resetFilter,
                       showFilter,
                       hideFilter
                   }) => {
    const params = useParams();
    const {auth} = useAuthStore();

    const deleteProjectScreenPlayAction = useMutation({
        mutationFn: (data: IDeleteProjectScreenPlay) => deleteProjectScreenPlayService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectScreenPlayAction.mutate({
                    ...filter,
                    project_id: params.id
                });
            } else {
                toast("error", data.message);
            }
        }
    });

    const tableColumns = useMemo(() => [
            {
                accessorKey: 'number',
                header: () => '#',
                cell: ({row}) => filter.page * filter.per_page - filter.per_page + row.index + 1,
                sortingFn: (rowA, rowB, columnId) => rowA.index - rowB.index
            },
            {
                accessorKey: 'address',
                header: () => 'آدرس',
                cell: ({row}) => (
                    <div
                        className="w-250px fs-6 text-dark text-truncate"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={row.original.address}
                    >
                        {row.original.address}
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'time_type',
                header: () => 'زمان اجرا',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        <Chip
                            color={row.original.time_type.class_name}
                            label={row.original.time_type.title}
                        />
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'location_side',
                header: () => 'سمت مکان',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        <Chip
                            color={row.original.location_side.class_name}
                            label={row.original.location_side.title}
                        />
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'part',
                header: () => 'بخش',
                cell: ({row}) => (
                    <div className="w-100px fs-6 text-dark text-truncate">
                        {row.original.part}
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.part - rowB.original.part
            },
            {
                accessorKey: 'sequence',
                header: () => 'سکانس',
                cell: ({row}) => (
                    <div className="w-100px fs-6 text-dark text-truncate">
                        {row.original.sequence}
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.sequence - rowB.original.sequence
            },
            {
                accessorKey: 'created_at',
                header: () => 'زمان ایجاد',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        {format(new Date(row.original.created_at), "hh:mm | yyy/MM/dd")}
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => {
                    return new Date(rowA.original.created_at).getTime() - new Date(rowB.original.created_at).getTime();
                }
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-start align-items-center w-max gap-2">
                        <IconButton
                            href={auth.panel_url + "projects/" + row.original.project_id + "/screen-plays/" + row.original.id + "/update"}
                            color="light-warning"
                            size="sm"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="ویرایش"
                        >
                            <LuPen
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>

                        <IconButton
                            color="light-danger"
                            size="sm"
                            onClick={() => {
                                dialog(
                                    "حذف بخش فیلم نامه",
                                    "آیا میخواهید این بخش فیلم نامه را حذف کنید ؟",
                                    "info",
                                    {
                                        show: true,
                                        text: "حذف",
                                        color: "danger",
                                    },
                                    {
                                        show: true,
                                        text: "انصراف",
                                        color: "light-dark",
                                    },
                                    async () => deleteProjectScreenPlayAction.mutate({screenplay_id: row.original.id.toString()})
                                )
                            }}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="حذف"
                        >
                            <LuTrash2
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>
                    </div>
                ),
                enableSorting: false
            },
        ], []
    );

    return (
        <>
            <div className="card w-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                    <Filter
                        readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                        filter={filter}
                        initialFilter={initialFilter}
                        changeFilter={changeFilter}
                        isOpenFilter={isOpenFilter}
                        showFilter={showFilter}
                        hideFilter={hideFilter}
                        resetFilter={resetFilter}
                    />

                    {
                        readAllProjectScreenPlayAction.data?.data?.screenplays.length > 0 && (
                            <Table
                                data={readAllProjectScreenPlayAction?.data?.data?.screenplays}
                                columns={tableColumns}
                            />
                        )
                    }

                    {
                        readAllProjectScreenPlayAction.data?.data?.screenplays.length === 0 && (
                            <Empty
                                title="پروژه ای یافت نشد"
                                width="100%"
                                height={300}
                            />
                        )
                    }

                    <Finder
                        readAllProjectScreenPlayAction={readAllProjectScreenPlayAction}
                        filter={filter}
                        changeFilter={changeFilter}
                    />
                </div>
            </div>

            <Tooltip/>
        </>
    )
}

export default DataTable;