// libraries
import {useMemo} from "react";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {format} from "date-fns-jalali";
import {LuPen, LuTrash2} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/read/members/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/members/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// helpers
import dialog from "@/helpers/dialog.tsx";
import toast from "@/helpers/toast.tsx";

// modules
import Table from "@/modules/Table.tsx";
import Tooltip from "@/modules/Tooltip.tsx";
import IconButton from "@/modules/IconButton.tsx";

// services
import {deleteProjectMemberService} from "@/services/projectMemberService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";

// types
import {IDeleteProjectMember} from "@/types/serviceType.ts";

const DataTable = ({
                       readAllProjectMemberAction,
                       filter,
                       initialFilter,
                       isOpenFilter,
                       changeFilter,
                       resetFilter,
                       showFilter,
                       hideFilter,
                       isListView,
                       toggleView
                   }) => {
    const {auth} = useAuthStore();

    const deleteProjectMemberAction = useMutation({
        mutationFn: (data: IDeleteProjectMember) => deleteProjectMemberService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectMemberAction.mutate(filter);
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
                accessorKey: 'full_name',
                header: () => 'نام و نام خانوادگی',
                cell: ({row}) => {
                    const name = (row.original.user_info?.first_name && row.original.user_info?.last_name) ? row.original.user_info.first_name + " " + row.original.user_info.last_name : row.original.name;

                    return (
                        <div
                            className="w-150px fs-6 text-dark text-truncate"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={name}
                        >
                            <LazyLoadImage
                                src={row.original.user_info?.profile_img}
                                alt={name}
                                width={40}
                                height={40}
                                className="rounded-circle me-2"
                            />

                            {name}
                        </div>
                    )
                },
                sortingFn: (rowA, rowB, columnId, desc) => {
                    if (!rowA.original.first_name && !rowB.original.first_name) {
                        return 0;
                    }

                    if (!rowA.original.first_name) {
                        return desc ? -1 : 1;
                    }

                    if (!rowB.original.first_name) {
                        return desc ? 1 : -1;
                    }

                    return rowA.original?.first_name.localeCompare(rowB.original?.first_name);
                }
            },
            {
                accessorKey: 'jobs',
                header: () => 'شغل',
                cell: ({row}) => (
                    <div
                        className="w-200px fs-6 text-dark text-truncate"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${row.original.parent_info.title} ( ${row.original.child_info.title} )`}
                    >
                        {`${row.original.parent_info.title} ( ${row.original.child_info.title} )`}
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-start align-items-center w-max gap-2">
                        <IconButton
                            href={auth.panel_url + "projects/" + row.original.project_id + "/members/" + row.original.id + "/update"}
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
                                    "حذف عضو",
                                    "آیا میخواهید این عضو را حذف کنید ؟",
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
                                    async () => deleteProjectMemberAction.mutate({member_id: row.original.id.toString()})
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
                        readAllProjectMemberAction={readAllProjectMemberAction}
                        filter={filter}
                        initialFilter={initialFilter}
                        changeFilter={changeFilter}
                        isOpenFilter={isOpenFilter}
                        showFilter={showFilter}
                        hideFilter={hideFilter}
                        resetFilter={resetFilter}
                        isListView={isListView}
                        toggleView={toggleView}
                    />

                    {
                        readAllProjectMemberAction.data?.data?.members.length > 0 && (
                            <Table
                                data={readAllProjectMemberAction?.data?.data?.members}
                                columns={tableColumns}
                            />
                        )
                    }

                    {
                        readAllProjectMemberAction.data?.data?.members.length === 0 && (
                            <Empty
                                title="عضوی یافت نشد"
                                width="100%"
                                height={300}
                            />
                        )
                    }

                    <Finder
                        readAllProjectMemberAction={readAllProjectMemberAction}
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