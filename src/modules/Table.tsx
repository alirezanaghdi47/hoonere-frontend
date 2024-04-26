// libraries
import {useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

const Table = ({data, columns}) => {
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="table-responsive w-100">
            <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                <thead>
                {
                    table.getHeaderGroups().map(headerGroup => (
                            <tr
                                key={headerGroup.id}
                                className="fw-bold text-muted"
                            >
                                {
                                    headerGroup.headers.map(header => {
                                            return (
                                                <th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
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
                                                                        asc: <i className="far fa-arrow-up fs-6 text-gray-500 ms-2"/>,
                                                                        desc: <i className="far fa-arrow-down fs-6 text-gray-500 ms-2"/>,
                                                                    }
                                                                        [header.column.getIsSorted()] ?? null}
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
                        <tr
                            key={row.id}
                            className="text-dark"
                        >
                            {
                                row.getVisibleCells().map(cell =>
                                    <td key={cell.id}>
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