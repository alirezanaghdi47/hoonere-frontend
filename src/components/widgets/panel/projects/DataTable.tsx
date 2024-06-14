// libraries
import {useMemo} from "react";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {format} from "date-fns-jalali";
import {LuInfo, LuPen, LuTrash2} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// modules
import Table from "@/modules/Table.tsx";
import Tooltip from "@/modules/Tooltip.tsx";
import IconButton from "@/modules/IconButton.tsx";
import dialog from "@/helpers/dialog.tsx";
import toast from "@/helpers/Toast.tsx";

// services
import {deleteProjectService} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IDeleteProject} from "@/types/services";

const DataTable = ({
                       readAllProjectAction,
                       filter,
                       initialFilter,
                       isOpenFilter,
                       changeFilter,
                       resetFilter,
                       showFilter,
                       hideFilter
                   }) => {
    const {auth} = useAuthStore();

    const deleteProjectAction = useMutation({
        mutationFn: (data: IDeleteProject) => deleteProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectAction.mutate(filter);
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
                accessorKey: 'logo',
                header: () => 'لوگو',
                cell: ({row}) => (
                    <div
                        className="w-100px fs-6 text-dark text-truncate"
                    >
                        <LazyLoadImage
                            src={row.original.logo}
                            alt={row.original.title}
                            width={50}
                            height={50}
                        />
                    </div>
                ),
                enableSorting: false
            },
            {
                accessorKey: 'title',
                header: () => 'عنوان',
                cell: ({row}) => (
                    <div
                        className="w-150px fs-6 text-dark text-truncate"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={row.original.title}
                    >
                        {row.original.title}
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'description',
                header: () => 'توضیحات',
                cell: ({row}) => (
                    <div
                        className="w-250px fs-6 text-dark text-truncate"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={row.original.description}
                    >
                        {row.original.description}
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'count_of_parts',
                header: () => 'تعداد قسمت ها',
                cell: ({row}) => (
                    <div className="w-100px fs-6 text-dark text-truncate">
                        {row.original.count_of_parts}
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'time_of_parts',
                header: () => 'مدت زمان ( دقیقه )',
                cell: ({row}) => (
                    <div className="w-100px fs-6 text-dark text-truncate">
                        {row.original.time_of_parts}
                    </div>
                ),
                sortingFn: "text"
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
                            href={auth.panel_url + "projects/" + row.original.id + "/members"}
                            color="light-info"
                            size="sm"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="نمایش اعضا"
                        >
                            <LuInfo
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>

                        <IconButton
                            href={auth.panel_url + "projects/" + row.original.id + "/update"}
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
                                    "حذف پروژه",
                                    "آیا میخواهید این پروژه را حذف کنید ؟",
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
                                    async () => deleteProjectAction.mutate({project_id: row.original.id.toString()})
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
                        readAllProjectAction={readAllProjectAction}
                        filter={filter}
                        initialFilter={initialFilter}
                        changeFilter={changeFilter}
                        isOpenFilter={isOpenFilter}
                        showFilter={showFilter}
                        hideFilter={hideFilter}
                        resetFilter={resetFilter}
                    />

                    {
                        readAllProjectAction.data?.data?.projects.length > 0 && (
                            <Table
                                data={readAllProjectAction?.data?.data?.projects}
                                columns={tableColumns}
                            />
                        )
                    }

                    {
                        readAllProjectAction.data?.data?.projects.length === 0 && (
                            <Empty
                                title="پروژه ای یافت نشد"
                                width="100%"
                                height={300}
                            />
                        )
                    }

                    <Finder
                        readAllProjectAction={readAllProjectAction}
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