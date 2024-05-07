// components
import Table from "@/components/widgets/panel/projects/Table.tsx";
import FilterBar from "@/components/widgets/panel/projects/FilterBar.tsx";

// hooks
import useFilter from "@/hooks/useFilter.tsx";

const Content = () => {
    const {filter, isOpenFilter, toggleFilter, resetFilter, changeFilter} = useFilter({
        text: "",
        to: "",
        from: "",
        page: 1,
        per_page: 12,
    });

    return (
        <div className="d-flex flex-column justify-content-start align-items-start gap-5 w-100 mw-950px mt-lg-n20 p-5">
            <FilterBar
                isOpenFilter={isOpenFilter}
                filter={filter}
                changeFilter={changeFilter}
                toggleFilter={toggleFilter}
                resetFilter={resetFilter}
            />

            <Table
                filter={filter}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default Content;