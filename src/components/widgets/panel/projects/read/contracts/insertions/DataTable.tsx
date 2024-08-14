// libraries
import {useMemo, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns-jalali";
import {LuDownload, LuPen, LuThumbsUp, LuTrash2} from "react-icons/lu";

// components
import Print from "@/components/widgets/panel/projects/read/contracts/insertions/Print.tsx";
import Finder from "@/components/widgets/panel/projects/read/contracts/insertions/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/contracts/insertions/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// helpers
import dialog from "@/helpers/dialog";
import toast from "@/helpers/toast"

// modules
import Table from "@/modules/Table";
import IconButton from "@/modules/IconButton";
import Typography from "@/modules/Typography";
import Chip from "@/modules/Chip";

// services
import {
    changeProjectContractInsertionStatusService,
    deleteProjectContractInsertionService,
    readProjectContractInsertionService,
} from "@/services/projectContractService";

// stores
import useAuthStore from "@/stores/authStore";

// types
import {
    IChangeProjectContractInsertionStatus,
    IDeleteProjectContractInsertion,
    IReadProjectContractInsertion
} from "@/types/serviceType.ts";

const DataTable = ({
                       readAllProjectContractInsertionAction,
                       filter,
                       initialFilter,
                       isOpenFilter,
                       changeFilter,
                       resetFilter,
                       showFilter,
                       hideFilter
                   }) => {
    const navigate = useNavigate();
    const params = useParams();
    const parentRef = useRef(null);
    const {auth} = useAuthStore();

    const readProjectContractInsertionAction = useMutation({
        mutationFn: (data: IReadProjectContractInsertion) => readProjectContractInsertionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                parentRef.current.insertion_info = {
                    ...data?.data?.insertion_info,
                    type_id: data?.data?.contract_info?.type_id,
                    members: data?.data?.contract_info?.members,
                    informal_members: data?.data?.contract_info?.informal_members
                };
                parentRef.current.print();
            }
        }
    });

    const changeProjectContractInsertionStatusAction = useMutation({
        mutationFn: (data: IChangeProjectContractInsertionStatus) => changeProjectContractInsertionStatusService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                // readAllProjectContractInsertionAction.mutate({
                //     ...filter,
                //     project_id: params.id,
                //     contract_id: params.subId
                // });

                navigate(0);
            } else {
                toast("error", data.message);
            }
        }
    });

    const deleteProjectContractInsertionAction = useMutation({
        mutationFn: (data: IDeleteProjectContractInsertion) => deleteProjectContractInsertionService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectContractInsertionAction.mutate({
                    ...filter,
                    project_id: params.id,
                    contract_id: params.subId
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
                accessorKey: 'insertion_number',
                header: () => 'شماره الحاقیه یا متمم',
                cell: ({row}) => (
                    <div
                        className="w-75px"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={row.original.insertion_number}
                    >
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.insertion_number}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.insertion_number - rowB.original.insertion_number
            },
            {
                accessorKey: 'status_info',
                header: () => 'نوع',
                cell: ({row}) => (
                    <div className="w-50px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.is_supplement === "0" ? "الحاقیه" : "متمم"}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original?.status_info.title.localeCompare(rowB.original?.status_info.title)
            },
            {
                accessorKey: 'start_date',
                header: () => 'تاریخ شروع',
                cell: ({row}) => (
                    <div className="w-100px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {format(row.original.start_date, "yyyy-MM-dd")}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => {
                    return new Date(rowA.original.start_date).getTime() - new Date(rowB.original.start_date).getTime();
                }
            },
            {
                accessorKey: 'end_date',
                header: () => 'تاریخ پایان',
                cell: ({row}) => (
                    <div className="w-100px">
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {format(row.original.end_date, "yyyy-MM-dd")}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => {
                    return new Date(rowA.original.end_date).getTime() - new Date(rowB.original.end_date).getTime();
                }
            },
            {
                accessorKey: 'total_price',
                header: () => 'مبلغ کل ( ریال )',
                cell: ({row}) => (
                    <div
                        className="w-75px"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={Number(row.original.total_price).toLocaleString()}
                    >
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {Number(row.original.total_price).toLocaleString()}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.total_price - rowB.original.total_price
            },
            {
                accessorKey: 'status_info',
                header: () => 'وضعیت',
                cell: ({row}) => (
                    <div className="w-75px">
                        <Chip
                            label={row.original.status_info.title}
                            color={row.original.status_info.class_name}
                        />
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original?.status_info.title.localeCompare(rowB.original?.status_info.title)
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-end align-items-center gap-2 w-100">
                        {
                            row.original.status_id === "1" && (
                                <IconButton
                                    color="light-success"
                                    size="sm"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="ثبت نهایی"
                                    onClick={() => changeProjectContractInsertionStatusAction.mutate({
                                        project_id: params.id,
                                        contract_id: row.original.contract_id,
                                        insertion_id: row.original.id.toString(),
                                    })}
                                >
                                    <LuThumbsUp
                                        size={20}
                                        color="currentColor"
                                    />
                                </IconButton>
                            )
                        }

                        <IconButton
                            color="light-dark"
                            size="sm"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={` دانلود ${row.original.is_supplement === "1" ? 'متمم' : 'الحاقیه'} `}
                            onClick={() => readProjectContractInsertionAction.mutate({
                                project_id: params.id,
                                contract_id: row.original.contract_id,
                                insertion_id: row.original.id.toString(),
                                get_last: 1
                            })}
                        >
                            <LuDownload
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>

                        {
                            !readProjectContractInsertionAction.isPending && (
                                <Print ref={parentRef}/>
                            )
                        }

                        <IconButton
                            href={row.original.is_supplement === "1" ? auth.panel_url + "projects/" + params.id + "/contracts/" + row.original.contract_id + "/insertions/" + row.original.id + "/update#is_supplement=1" : auth.panel_url + "projects/" + params.id + "/contracts/" + row.original.contract_id + "/insertions/" + row.original.id + "/update#is_supplement=0"}
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
                                    ` حذف ${row.original.is_supplement === 1 ? 'متمم' : 'الحاقیه'}`,
                                    ` آیا میخواهید این ${row.original.is_supplement === 1 ? 'متمم' : 'الحاقیه'} را حذف کنید ؟ `,
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
                                    async () => deleteProjectContractInsertionAction.mutate({
                                        project_id: params.id,
                                        contract_id: row.original.contract_id,
                                        insertion_id: row.original.id.toString(),
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
                    readAllProjectContractInsertionAction={readAllProjectContractInsertionAction}
                    filter={filter}
                    initialFilter={initialFilter}
                    changeFilter={changeFilter}
                    isOpenFilter={isOpenFilter}
                    showFilter={showFilter}
                    hideFilter={hideFilter}
                    resetFilter={resetFilter}
                />

                {
                    readAllProjectContractInsertionAction.data?.data?.insertions.length > 0 && (
                        <Table
                            data={readAllProjectContractInsertionAction?.data?.data?.insertions}
                            columns={tableColumns}
                        />
                    )
                }

                {
                    readAllProjectContractInsertionAction.data?.data?.insertions.length === 0 && (
                        <Empty
                            title="قرارداد یافت نشد"
                            width="100%"
                            height={300}
                        />
                    )
                }

                <Finder
                    readAllProjectContractInsertionAction={readAllProjectContractInsertionAction}
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default DataTable;