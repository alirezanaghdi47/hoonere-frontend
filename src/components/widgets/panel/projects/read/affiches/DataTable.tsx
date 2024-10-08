// libraries
import {useMemo} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns-jalali";
import {LuHistory, LuInfo, LuPen, LuTrash2} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/read/affiches/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/affiches/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// modules
import Table from "@/modules/Table";
import IconButton from "@/modules/IconButton";
import Typography from "@/modules/Typography";
import Dialog from "@/modules/Dialog";
import Toast from "@/modules/Toast";
import Badge from "@/modules/Badge";

// services
import {deleteProjectAfficheService, IDeleteProjectAffiche} from "@/services/projectAfficheService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

const DataTable = ({
                       checkProjectIsMineAction,
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
    const location = useLocation();
    const navigate = useNavigate();
    const {auth} = useAuthStore();
    const {app: {notifications}} = useAppStore();

    const deleteProjectAfficheAction = useMutation({
        mutationFn: (data: IDeleteProjectAffiche) => deleteProjectAfficheService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readAllProjectAfficheAction.mutate({
                    ...filter,
                    project_id: params.id
                });
            } else {
                Toast("error", data.message);
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
                cell: ({row}) =>
                    checkProjectIsMineAction.data?.data?.result === "1" ? (
                        <div className="d-flex justify-content-start align-items-center gap-2 w-100">
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
                                color="light-info"
                                size="sm"
                                onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/affiches/" + row.original.id, {state: {background: location}})}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="جزییات"
                            >
                                <LuInfo
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
                                    Dialog(
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
                    ) : (
                        <div className="d-flex justify-content-start align-items-center gap-2 w-100">
                            <IconButton
                                color="light-info"
                                size="sm"
                                onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/affiches/" + row.original.id + "/invited", {state: {background: location}})}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="جزییات"
                            >
                                {
                                    notifications.filter(notification => notification.type === "affiche" && notification.target_id === row.original.id.toString()).length > 0 && (
                                        <Badge
                                            size="xs"
                                            color="danger"
                                            isCircle
                                            placement="top-end"
                                        />
                                    )
                                }

                                <LuInfo
                                    size={20}
                                    color="currentColor"
                                />
                            </IconButton>
                        </div>
                    ),
                enableSorting: false
            },
        ], [checkProjectIsMineAction , notifications]
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