// libraries
import {useMemo} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {format} from "date-fns-jalali";
import {LuInfo} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/read/affiches/histories/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/affiches/histories/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// modules
import Table from "@/modules/Table";
import IconButton from "@/modules/IconButton";
import Typography from "@/modules/Typography";

// stores
import useAuthStore from "@/stores/authStore";

const DataTable = ({
                       readAllProjectAfficheHistoryAction,
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
                accessorKey: 'date',
                header: () => 'تاریخ',
                cell: ({row}) => (
                    <div className="w-100px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {format(row.original.created_at, "yyyy-MM-dd")}
                        </Typography>
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
                    <div className="d-flex justify-content-end align-items-center gap-2 w-100">
                        <IconButton
                            color="light-info"
                            size="sm"
                            onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/affiches/" + params.subId + "/histories/" + row.original.id, {state: {background: location}})}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="جزییات"
                        >
                            <LuInfo
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
                    readAllProjectAfficheHistoryAction={readAllProjectAfficheHistoryAction}
                    filter={filter}
                    initialFilter={initialFilter}
                    changeFilter={changeFilter}
                    isOpenFilter={isOpenFilter}
                    showFilter={showFilter}
                    hideFilter={hideFilter}
                    resetFilter={resetFilter}
                />

                {
                    readAllProjectAfficheHistoryAction.data?.data?.history.length > 0 && (
                        <Table
                            data={readAllProjectAfficheHistoryAction?.data?.data?.history}
                            columns={tableColumns}
                        />
                    )
                }

                {
                    readAllProjectAfficheHistoryAction.data?.data?.history.length === 0 && (
                        <Empty
                            title="تاریخچه ای یافت نشد"
                            width="100%"
                            height={300}
                        />
                    )
                }

                <Finder
                    readAllProjectAfficheHistoryAction={readAllProjectAfficheHistoryAction}
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default DataTable;