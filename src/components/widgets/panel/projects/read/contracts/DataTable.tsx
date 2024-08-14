// libraries
import {useMemo, useRef} from "react";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {format} from "date-fns-jalali";
import {
    LuClipboardSignature,
    LuDownload,
    LuFileCheck, LuFilePlus,
    LuFileSignature,
    LuPen,
    LuThumbsUp,
    LuTrash2
} from "react-icons/lu";

// components
import Print from "@/components/widgets/panel/projects/read/contracts/Print.tsx";
import Finder from "@/components/widgets/panel/projects/read/contracts/Finder.tsx";
import Filter from "@/components/widgets/panel/projects/read/contracts/Filter.tsx";
import Empty from "@/components/partials/panel/Empty.tsx";

// helpers
import dialog from "@/helpers/dialog";
import toast from "@/helpers/toast";

// modules
import Table from "@/modules/Table";
import IconButton from "@/modules/IconButton";
import Typography from "@/modules/Typography";
import Chip from "@/modules/Chip";

// services
import {
    changeProjectContractStatusService,
    deleteProjectUnOfficialContractService,
    deleteProjectOfficialContractService,
    readProjectOfficialContractService,
    readProjectUnOfficialContractService
} from "@/services/projectContractService";

// stores
import useAuthStore from "@/stores/authStore";
import {
    IChangeProjectContractStatus,
    IDeleteProjectOfficialContract,
    IDeleteProjectUnOfficialContract,
    IReadProjectOfficialContract,
    IReadProjectUnOfficialContract
} from "@/types/serviceType.ts";

// types


const DataTable = ({
                       readAllProjectContractAction,
                       filter,
                       initialFilter,
                       isOpenFilter,
                       changeFilter,
                       resetFilter,
                       showFilter,
                       hideFilter
                   }) => {
    const params = useParams();
    const parentRef = useRef(null);
    const {auth} = useAuthStore();

    const readProjectOfficialContractAction = useMutation({
        mutationFn: (data: IReadProjectOfficialContract) => readProjectOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                parentRef.current.contract_info = data?.data?.contract_info;
                parentRef.current.print();
            }
        }
    });

    const readProjectUnOfficialContractAction = useMutation({
        mutationFn: (data: IReadProjectUnOfficialContract) => readProjectUnOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                parentRef.current.contract_info = data?.data?.contract_info;
                parentRef.current.print();
            }
        }
    });

    const changeProjectContractStatusAction = useMutation({
        mutationFn: (data: IChangeProjectContractStatus) => changeProjectContractStatusService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectContractAction.mutate({
                    ...filter,
                    project_id: params.id
                });
            } else {
                toast("error", data.message);
            }
        }
    });

    const deleteProjectOfficialContractAction = useMutation({
        mutationFn: (data: IDeleteProjectOfficialContract) => deleteProjectOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectContractAction.mutate({
                    ...filter,
                    project_id: params.id
                });
            } else {
                toast("error", data.message);
            }
        }
    });

    const deleteProjectUnOfficialContractAction = useMutation({
        mutationFn: (data: IDeleteProjectUnOfficialContract) => deleteProjectUnOfficialContractService(data),
        onSuccess: async (data) => {
            if (!data.error) {
                toast("success", data.message);

                readAllProjectContractAction.mutate({
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
                accessorKey: 'contract_number',
                header: () => 'شماره قرارداد',
                cell: ({row}) => (
                    <div
                        className="w-50px"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={row.original.contract_number}
                    >
                        <Typography
                            size="xs"
                            color="dark"
                            truncate={1}
                        >
                            {row.original.contract_number}
                        </Typography>
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original.contract_number - rowB.original.contract_number
            },
            {
                accessorKey: 'start_date',
                header: () => 'تاریخ شروع',
                cell: ({row}) => (
                    <div className="w-75px">
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
                    <div className="w-75px">
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
                accessorKey: 'parties',
                header: () => 'طرفین قرارداد',
                cell: ({row}) => (
                    <div className="w-100px">
                        <ul className="hstack flex-wrap list-unstyled justify-content-start align-items-start gap-2 p-0 m-0">
                            {
                                row.original.type_id === "1" ? row.original.members.map(member =>
                                    <li
                                        key={member.id}
                                        className=""
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={member.side_info.title}
                                    >
                                        <Chip
                                            label={member?.user_info?.company_name ? member?.user_info?.company_name : member?.user_info?.first_name + " " + member?.user_info?.last_name}
                                            color={member.side_info.class_name}
                                        />
                                    </li>
                                ) : row.original.informal_members.map(member =>
                                    <li
                                        key={member.id}
                                        className=""
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={member.side_info.title}
                                    >
                                        <Chip
                                            label={member?.company_name ? member?.company_name : member?.first_name + " " + member?.last_name}
                                            color={member.side_info.class_name}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                ),
                enableSorting: false
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
                        {
                            row.original.type_id === "1" && (
                                <Chip
                                    label={row.original.status_info.title}
                                    color={row.original.status_info.class_name}
                                />
                            )
                        }
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => rowA.original?.status_info.title.localeCompare(rowB.original?.status_info.title)
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-end align-items-center gap-2 w-100">
                        <IconButton
                            href={auth.panel_url + "projects/" + row.original.project_id + "/contracts/" + row.original.id + "/insertions"}
                            color="light-info"
                            size="sm"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="متمم و الحاقیه ها"
                        >
                            <LuFilePlus
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>

                        {
                            row.original.type_id === "1" && row.original.status_id === "1" && (
                                <IconButton
                                    color="light-success"
                                    size="sm"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="ثبت نهایی"
                                    onClick={() => changeProjectContractStatusAction.mutate({
                                        project_id: row.original.project_id,
                                        contract_id: row.original.id.toString(),
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
                            data-tooltip-content="دانلود قرارداد"
                            onClick={() => row.original.type_id === "1" ? readProjectOfficialContractAction.mutate({
                                project_id: row.original.project_id,
                                contract_id: row.original.id.toString(),
                                get_last: 1
                            }) : readProjectUnOfficialContractAction.mutate({
                                project_id: row.original.project_id,
                                contract_id: row.original.id.toString(),
                                get_last: 1
                            })}
                        >
                            <LuDownload
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>

                        {
                            (!readProjectOfficialContractAction.isPending || !readProjectUnOfficialContractAction.isPending) && (
                                <Print ref={parentRef}/>
                            )
                        }

                        <IconButton
                            href={row.original.type_id === "1" ? auth.panel_url + "projects/" + row.original.project_id + "/contracts/" + row.original.id + "/update#official" : auth.panel_url + "projects/" + row.original.project_id + "/contracts/" + row.original.id + "/update#un-official"}
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
                                    "حذف قرارداد",
                                    "آیا میخواهید این قرارداد را حذف کنید ؟",
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
                                    async () => row.original.type_id === "1" ? deleteProjectOfficialContractAction.mutate({
                                        contract_id: row.original.id.toString(),
                                        project_id: row.original.project_id
                                    }) : deleteProjectUnOfficialContractAction.mutate({
                                        contract_id: row.original.id.toString(),
                                        project_id: row.original.project_id
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
                    readAllProjectContractAction={readAllProjectContractAction}
                    filter={filter}
                    initialFilter={initialFilter}
                    changeFilter={changeFilter}
                    isOpenFilter={isOpenFilter}
                    showFilter={showFilter}
                    hideFilter={hideFilter}
                    resetFilter={resetFilter}
                />

                {
                    readAllProjectContractAction.data?.data?.contracts.length > 0 && (
                        <Table
                            data={readAllProjectContractAction?.data?.data?.contracts}
                            columns={tableColumns}
                        />
                    )
                }

                {
                    readAllProjectContractAction.data?.data?.contracts.length === 0 && (
                        <Empty
                            title="قرارداد یافت نشد"
                            width="100%"
                            height={300}
                        />
                    )
                }

                <Finder
                    readAllProjectContractAction={readAllProjectContractAction}
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default DataTable;