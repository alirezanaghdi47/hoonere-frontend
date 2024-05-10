// libraries
import {useMemo} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuInfo, LuPen, LuTrash2} from "react-icons/lu";

// components
import Finder from "@/components/widgets/panel/projects/Finder.tsx";

// modules
import DataTable from "@/modules/DataTable.tsx";
import Chip from "@/modules/Chip.tsx";
import Tooltip from "@/modules/Tooltip.tsx";
import IconButton from "@/modules/IconButton.tsx";
import dialog from "@/modules/dialog.tsx";

// stores
import useAuthStore from "@/stores/authStore.ts";

const Table = ({filter , changeFilter}) => {
    const {auth} = useAuthStore();

    const tableColumns = useMemo(() => [
            {
                accessorKey: 'number',
                header: () => '#',
            },
            {
                accessorKey: 'logo',
                header: () => 'لوگو',
                cell: ({row}) => (
                    <div className="w-50px">
                        <LazyLoadImage
                            src="/assets/images/logo.svg"
                            alt="logo"
                            width={40}
                            height={40}
                            className='rounded-2'
                        />
                    </div>
                )
            },
            {
                accessorKey: 'name',
                header: () => 'عنوان',
                cell: ({row}) => (
                    <div className="w-100px fs-6 text-dark text-truncate">
                        پروژه 1
                    </div>
                )
            },
            {
                accessorKey: 'type',
                header: () => 'نوع',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        <Chip
                            color={row.original.type === "فیلم" ? "light-primary" : "light-info"}
                            label={row.original.type}
                        />
                    </div>
                )
            },
            {
                accessorKey: 'detail',
                header: () => 'زمان بندی',
                cell: ({row}) => (
                    <div className="w-200px fs-6 text-dark text-truncate">
                        {row.original.detail}
                    </div>
                )
            },
            {
                accessorKey: 'producer',
                header: () => 'تهیه کننده',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'supervisor',
                header: () => 'ناظر',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'presenter',
                header: () => 'مجری',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'employer',
                header: () => 'کارفرما',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'investor',
                header: () => 'سرمایه گذار',
                cell: ({row}) => (
                    <div className="w-150px fs-6 text-dark text-truncate">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'producer',
                header: () => 'مکان فیلم برداری',
                cell: ({row}) => (
                    <div className="w-450px fs-6 text-dark text-truncate">
                        ایران ، تهران ، میدان ولی عصر
                    </div>
                )
            },
            {
                accessorKey: 'actions',
                header: () => 'ابزار',
                cell: ({row}) => (
                    <div className="d-flex justify-content-start align-items-center w-max gap-2">
                        <IconButton
                            href={auth.panel_url + "projects/1"}
                            color="light-info"
                            size="sm"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="جزییات"
                        >
                            <LuInfo
                                size={20}
                                color="currentColor"
                            />
                        </IconButton>

                        <IconButton
                            href={auth.panel_url + "projects/1/edit"}
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
                                    async () => console.log("deleted")
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
                )
            },
        ], []
    );

    const tableData = [
        {number: 1, name: "کاظمیه", producer: "کاظم کاظمی", type: "سریال", detail: "20 قسمت ( 50 دقیقه ای )"},
        {number: 2, name: "سهیلیه", producer: "سهیل سهیلی", type: "فیلم", detail: "120 دقیقه"},
    ];

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <DataTable
                    data={tableData}
                    columns={tableColumns}
                />

                <Finder
                    filter={filter}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default Table;