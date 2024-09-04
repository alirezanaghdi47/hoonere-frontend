// libraries
import {useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuBriefcase, LuInfo, LuPen, LuScale, LuTrash2} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// modules
import Table from "@/modules/Table";
import IconButton from "@/modules/IconButton";
import Button from "@/modules/Button";
import Typography from "@/modules/Typography";
import Chip from "@/modules/Chip";
import Dialog from "@/modules/Dialog";
import Toast from "@/modules/Toast";
import Badge from "@/modules/Badge";

// services
import {deleteProjectService, IDeleteProject} from "@/services/projectService.ts";

// stores
import useAuthStore from "@/stores/authStore.ts";
import useAppStore from "@/stores/appStore.ts";

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
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuthStore();
    const {app: {notifications}} = useAppStore();

    const deleteProjectAction = useMutation({
        mutationFn: (data: IDeleteProject) => deleteProjectService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                Toast("success", data.message);

                readAllProjectAction.mutate(filter);
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
                accessorKey: 'logo',
                header: () => 'لوگو',
                cell: ({row}) => (
                    <div className="w-50px">
                        <LazyLoadImage
                            src={row.original.logo}
                            width={40}
                            height={40}
                        />
                    </div>
                ),
                enableSorting: false
            },
            {
                accessorKey: 'title',
                header: () => 'عنوان',
                cell: ({row}) =>
                    location.hash === "#is_invited=0" ? (
                        <div
                            className="w-100px"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={row.original.title}
                        >
                            <Button
                                textColor="light-success"
                                href={auth.panel_url + "projects/" + row.original.id}
                                direction='start'
                                isDense
                            >
                                {
                                    notifications.filter(notification => notification.type === "project" && notification.project_id === row.original.id.toString()).length > 0 && (
                                        <Chip
                                            color="danger"
                                            label={notifications.filter(notification => notification.type === "project" && notification.project_id === row.original.id.toString()).length}
                                        />
                                    )
                                }

                                {row.original.title}
                            </Button>
                        </div>
                    ) : (
                        <div
                            className="w-100px"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={row.original.title}
                        >
                            <Typography
                                size="xs"
                                color="dark"
                            >
                                {row.original.title}
                            </Typography>
                        </div>
                    ),
                sortingFn: "text"
            },
            {
                accessorKey: 'count_of_parts',
                header: () => 'تعداد قسمت ها',
                cell: ({row}) => (
                    <div className="w-50px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.count_of_parts}
                        </Typography>
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'time_of_parts',
                header: () => 'زمان ( دقیقه )',
                cell: ({row}) => (
                    <div className="w-50px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.time_of_parts}
                        </Typography>
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'status_info',
                header: () => 'وضعیت مشارکت',
                cell: ({row}) => (
                    <div className="w-75px">
                        <Chip
                            label={row.original?.status_info?.title}
                            color={row.original?.status_info?.class_name}
                        />
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) =>
                    location.hash === "#is_invited=0" ? (
                        <div className="d-flex justify-content-start align-items-center gap-2 w-100">
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
                                    Dialog(
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
                    ) : (
                        <div className="d-flex justify-content-start align-items-center gap-2 w-100">
                            <IconButton
                                color="light-info"
                                size="sm"
                                onClick={() => navigate(auth.panel_url + "projects/" + row.original.id + "/affiches#is_invited=1")}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="آفیش ها"
                            >
                                {
                                    notifications.filter(notification => notification.type === "affiche" && notification.project_id === row.original.id.toString()).length > 0 && (
                                        <Badge
                                            size="xs"
                                            color="danger"
                                            isCircle
                                            placement="top-end"
                                        />
                                    )
                                }

                                <LuBriefcase
                                    size={20}
                                    color="currentColor"
                                />
                            </IconButton>

                            <IconButton
                                color="light-info"
                                size="sm"
                                onClick={() => navigate(auth.panel_url + "projects/" + row.original.id + "/contracts#is_invited=1")}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="قرارداد ها"
                            >
                                {
                                    notifications.filter(notification => notification.type === "contract" && notification.project_id === row.original.id.toString()).length > 0 && (
                                        <Badge
                                            size="xs"
                                            color="danger"
                                            isCircle
                                            placement="top-end"
                                        />
                                    )
                                }

                                <LuScale
                                    size={20}
                                    color="currentColor"
                                />
                            </IconButton>

                            <IconButton
                                color="light-info"
                                size="sm"
                                onClick={() => navigate(auth.panel_url + "projects/" + row.original.id + "/invited", {state: {background: location}})}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="جزییات"
                            >
                                {
                                    notifications.filter(notification => notification.type === "project" && notification.project_id === row.original.id.toString()).length > 0 && (
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
        ], [location.hash]
    );

    return (
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
                            title="پروژه یافت نشد"
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
    )
}

export default DataTable;