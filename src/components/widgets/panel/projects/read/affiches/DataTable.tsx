// libraries
import {useMemo} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns-jalali";
import {LuHistory, LuPen, LuTrash2} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/read/affiches/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/affiches/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// helpers
import dialog from "@/helpers/dialog";
import toast from "@/helpers/toast";

// modules
import Table from "@/modules/Table";
import IconButton from "@/modules/IconButton";
import Typography from "@/modules/Typography";

// services
import {deleteProjectAfficheService} from "@/services/projectAfficheService.ts";

// stores
import useAuthStore from "@/stores/authStore";

// types
import {IDeleteProjectAffiche} from "@/types/serviceType.ts";

const DataTable = ({
                       readAllProjectAfficheAction,
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

    const deleteProjectAfficheAction = useMutation({
        mutationFn: (data: IDeleteProjectAffiche) => deleteProjectAfficheService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectAfficheAction.mutate({
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
                accessorKey: 'number_string',
                header: () => 'شماره',
                cell: ({row}) => (
                    <div className="w-50px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.number_string}
                        </Typography>
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'type_info',
                header: () => 'نوع',
                cell: ({row}) => (
                    <div className="w-100px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.type_info?.title}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.type_id.title - rowB.original.type_id.title
            },
            {
                accessorKey: 'affiche_date',
                header: () => 'تاریخ آفیش',
                cell: ({row}) => (
                    <div className="w-100px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {format(row.original.affiche_date, "yyyy-MM-dd")}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => {
                    return new Date(rowA.original.affiche_date).getTime() - new Date(rowB.original.affiche_date).getTime();
                }
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-end align-items-center gap-2 w-100">
                        <IconButton
                            href={auth.panel_url + "projects/" + row.original.project_id + "/affiches/" + row.original.id + "/histories"}
                            color="light-info"
                            size="sm"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="تاریخچه"
                        >
                            <LuHistory
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>

                        <IconButton
                            href={auth.panel_url + "projects/" + row.original.project_id + "/affiches/" + row.original.id + "/update"}
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
                                    "حذف آفیش",
                                    "آیا میخواهید این آفیش را حذف کنید ؟",
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
                                    async () => deleteProjectAfficheAction.mutate({
                                        project_id: row.original.project_id,
                                        affiche_id: row.original.id.toString(),
                                    })
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
        <div className="card w-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                <Filter
                    readAllProjectAfficheAction={readAllProjectAfficheAction}
                    filter={filter}
                    initialFilter={initialFilter}
                    changeFilter={changeFilter}
                    isOpenFilter={isOpenFilter}
                    showFilter={showFilter}
                    hideFilter={hideFilter}
                    resetFilter={resetFilter}
                />

                {
                    readAllProjectAfficheAction.data?.data?.affiches.length > 0 && (
                        <Table
                            data={readAllProjectAfficheAction?.data?.data?.affiches}
                            columns={tableColumns}
                        />
                    )
                }

                {
                    readAllProjectAfficheAction.data?.data?.affiches.length === 0 && (
                        <Empty
                            title="آفیش یافت نشد"
                            width="100%"
                            height={300}
                        />
                    )
                }

                <Finder
                    readAllProjectAfficheAction={readAllProjectAfficheAction}
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default DataTable;