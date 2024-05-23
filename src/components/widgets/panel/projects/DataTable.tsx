// libraries
import {useMemo} from "react";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {format} from "date-fns-jalali";
import {LuInfo, LuPen, LuTrash2} from "react-icons/lu";

// modules
import Table from "@/modules/Table.tsx";
import Tooltip from "@/modules/Tooltip.tsx";
import IconButton from "@/modules/IconButton.tsx";
import dialog from "@/modules/dialog.tsx";
import toast from "@/modules/Toast.tsx";

// services
import {deleteProjectService} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

const DataTable = ({readAllProjectAction, filter}) => {
    const {auth} = useAuthStore();

    const deleteProjectAction = useMutation({
        mutationFn: (data) => deleteProjectService(data),
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
                cell: ({row}) => row.index + 1,
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
                    return new Date(rowA.original.created_at) - new Date(rowB.original.created_at);
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

                        <Tooltip/>
                    </div>
                ),
                enableSorting: false
            },
        ], []
    );

    return (
        <Table
            data={readAllProjectAction?.data?.data?.projects}
            columns={tableColumns}
        />
    )
}

export default DataTable;