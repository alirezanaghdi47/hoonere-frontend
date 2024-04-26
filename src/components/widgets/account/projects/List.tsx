// libraries
import {useMemo} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";

// assets
import logo from "@/assets/images/logo.svg";

// components
import TableNavigator from "@/components/widgets/account/projects/TableNavigator.tsx";
import TableFinder from "@/components/widgets/account/projects/TableFinder.tsx";

// helpers
import dialog from "@/modules/dialog.tsx";

// modules
import Table from "@/modules/Table.tsx";
import Chip from "@/modules/Chip.tsx";
import Tooltip from "@/modules/Tooltip.tsx";
import IconButton from "@/modules/IconButton.tsx";

const List = () => {
    const tableColumns = useMemo(() => [
            {
                accessorKey: 'number',
                header: () => '#',
            },
            {
                accessorKey: 'name',
                header: () => 'پروژه',
                cell: ({row}) => (
                    <div className="d-flex align-items-center gap-2 text-truncate w-150px">
                        <LazyLoadImage
                            src={logo}
                            alt="logo"
                            width={25}
                            height={25}
                            className='rounded-2'
                        />
                        پروژه 1
                    </div>
                )
            },
            {
                accessorKey: 'type',
                header: () => 'نوع',
                cell: ({row}) => (
                    <div className="text-truncate w-150px">
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
                <div className="text-truncate w-200px">
                    {row.original.detail}
                </div>
            )
        },
            {
                accessorKey: 'producer',
                header: () => 'تهیه کننده',
                cell: ({row}) => (
                    <div className="text-truncate w-150px">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'supervisor',
                header: () => 'ناظر',
                cell: ({row}) => (
                    <div className="text-truncate w-150px">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'presenter',
                header: () => 'مجری',
                cell: ({row}) => (
                    <div className="text-truncate w-150px">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'employer',
                header: () => 'کارفرما',
                cell: ({row}) => (
                    <div className="text-truncate w-150px">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'investor',
                header: () => 'سرمایه گذار',
                cell: ({row}) => (
                    <div className="text-truncate w-150px">
                        علیرضا نقدی
                    </div>
                )
            },
            {
                accessorKey: 'producer',
                header: () => 'مکان فیلم برداری',
                cell: ({row}) => (
                    <div className="text-truncate w-450px">
                        ایران ، تهران ، میدان ولی عصر
                    </div>
                )
            },
        {
            accessorKey: 'actions',
            header: () => 'ابزار',
            cell: ({row}) => (
                <div className="d-flex justify-content-start align-items-center w-max gap-5">
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
                        data-tooltip-content="حذف پروژه"
                    >
                        <i className="fad fa-trash fs-4"/>
                    </IconButton>

                    <Tooltip/>
                </div>
            )
        },
        ], []
    );

    const tableData = [
        {number: 1, name: "کاظمیه", producer: "کاظم کاظمی", type: "سریال" , detail: "20 قسمت ( 50 دقیقه ای )"},
        {number: 2, name: "سهیلیه", producer: "سهیل سهیلی", type: "فیلم" , detail: "120 دقیقه"},
    ];

    return (
        <div className="card w-100">
            <div className="card-body d-flex flex-column gap-5">
                <TableFinder/>

                <Table
                    data={tableData}
                    columns={tableColumns}
                />

                <TableNavigator/>
            </div>
        </div>
    )
}

export default List;