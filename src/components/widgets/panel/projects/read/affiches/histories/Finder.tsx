// modules
import SelectBox from "@/modules/SelectBox.tsx";
import Pagination from "@/modules/Pagination.tsx";

const options = [
    {value: 12, label: '12'},
    {value: 24, label: '24'},
    {value: 48, label: '48'},
    {value: 96, label: '96'}
];

const Finder = ({readAllProjectAfficheHistoryAction, filter, changeFilter}) => {
    return (
        <div
            className={`d-flex flex-wrap ${readAllProjectAfficheHistoryAction.data?.data?.pagination?.total > filter.per_page ? "justify-content-center justify-content-sm-between" : "justify-content-start"} align-items-center w-100 gap-5`}>
            <div className="w-125px">
                <SelectBox
                    id='pageSize'
                    name='pageSize'
                    value={filter.per_page}
                    options={options}
                    onChange={(value) => {
                        changeFilter({per_page: value});
                        readAllProjectAfficheHistoryAction.mutate({...filter, per_page: value});
                    }}
                />
            </div>

            {
                readAllProjectAfficheHistoryAction.data?.data?.pagination?.total > filter.per_page && (
                    <Pagination
                        current={filter.page}
                        pageSize={filter.per_page}
                        total={readAllProjectAfficheHistoryAction.data?.data?.pagination?.total}
                        onChange={(value) => {
                            changeFilter({page: value});
                            readAllProjectAfficheHistoryAction.mutate({...filter, page: value});
                        }}
                    />
                )
            }
        </div>
    )
}

export default Finder;