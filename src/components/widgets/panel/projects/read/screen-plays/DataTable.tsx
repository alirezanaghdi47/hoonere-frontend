// libraries
import {useMemo, useRef} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import ReactToPrint from 'react-to-print';
import {LuDownload, LuPen, LuTrash2} from "react-icons/lu";

// components
import Print from "@/components/widgets/panel/projects/read/screen-plays/Print.tsx";
import Finder from "@/components/widgets/panel/projects/read/screen-plays/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/screen-plays/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// helpers
import dialog from "@/helpers/dialog.tsx";
import toast from "@/helpers/toast.tsx";

// modules
import Table from "@/modules/Table.tsx";
import IconButton from "@/modules/IconButton.tsx";
import Typography from "@/modules/Typography.tsx";

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
    const location = useLocation();
    const navigate = useNavigate();
    const printRef = useRef();
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
                accessorKey: 'part',
                header: () => 'قسمت',
                cell: ({row}) => (
                    <div className="w-50px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.part}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.part - rowB.original.part
            },
            {
                accessorKey: 'sequence',
                header: () => 'سکانس',
                cell: ({row}) => (
                    <div className="w-50px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.sequence}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.sequence - rowB.original.sequence
            },
            {
                accessorKey: 'address',
                header: () => 'آدرس',
                cell: ({row}) => (
                    <div
                        className="w-250px"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={row.original.address}
                    >
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.address}
                        </Typography>
                    </div>
                ),
                sortingFn: "text"
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-start align-items-center gap-2 w-max">
                        {/*<IconButton*/}
                        {/*    color="light-info"*/}
                        {/*    size="sm"*/}
                        {/*    onClick={() => navigate(auth.panel_url + "projects/" + params.id + "/screen-plays/" + row.original.id, {state: {background: location}})}*/}
                        {/*    data-tooltip-id="my-tooltip"*/}
                        {/*    data-tooltip-content="جزییات"*/}
                        {/*>*/}
                        {/*    <LuInfo*/}
                        {/*        size={20}*/}
                        {/*        color="currentColor"*/}
                        {/*    />*/}
                        {/*</IconButton>*/}

                        <ReactToPrint
                            documentTitle={`screenplay-${row.original.created_at}`}
                            trigger={() => (
                                <IconButton
                                    color="light-info"
                                    size="sm"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="دانلود فیلم نامه"
                                >
                                    <LuDownload
                                        size={20}
                                        color="currentColor"
                                    />
                                </IconButton>
                            )}
                            content={() => printRef.current}
                        />

                        <Print
                            ref={printRef}
                            screenPlay={row.original}
                        />

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
                            title="فیلم نامه یافت نشد"
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
    )
}

export default DataTable;