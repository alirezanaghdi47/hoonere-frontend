// libraries
import {CSSProperties, useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {LuArrowDown, LuArrowUp} from "react-icons/lu";

type TTable = {
    data: unknown,
    columns: unknown,
    style?: CSSProperties
}

const Table = ({data, columns}: TTable) => {
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        // @ts-ignore
        data,
        // @ts-ignore
        columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="table-responsive w-100 min-h-300px">
            <table className="table table-flush align-middle table-row-dashed gy-5 dataTable no-footer">
                <thead>
                {
                    table.getHeaderGroups().map(headerGroup => (
                            <tr
                                key={headerGroup.id}
                                className="fs-6 fw-bold text-gray-600 user-select-none"
                            >
                                {
                                    headerGroup.headers.map(header => {
                                            return (
                                                <th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    className='p-2'
                                                >
                                                    {
                                                        header.isPlaceholder ? null : (
                                                            <div
                                                                {...{
                                                                    className: header.column.getCanSort() ? 'text-nowrap cursor-pointer select-none' : '',
                                                                    onClick: header.column.getToggleSortingHandler(),
                                                                }}
                                                            >
                                                                {
                                                                    flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )
                                                                }
                                                                {
                                                                    {
                                                                        asc: <LuArrowUp
                                                                            size={20}
                                                                            color="currentColor"
                                                                            className="text-gray-500 ms-2"
                                                                        />,
                                                                        desc: <LuArrowDown
                                                                            size={20}
                                                                            color="currentColor"
                                                                            className="text-gray-500 ms-2"
                                                                        />,
                                                                        // @ts-ignore
                                                                    } [header.column.getIsSorted()] ?? null}
                                                            </div>
                                                        )
                                                    }
                                                </th>
                                            )
                                        }
                                    )
                                }
                            </tr>
                        )
                    )
                }
                </thead>
                <tbody>
                {
                    table.getRowModel().rows.map(row =>
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map(cell =>
                                    <td
                                        key={cell.id}
                                        className='fs-6 text-dark p-2'
                                    >
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }
                                    </td>
                                )
                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default Table;