// libraries
import {useParams} from "react-router-dom";

// modules
import SelectBox from "@/modules/SelectBox";
import Pagination from "@/modules/Pagination";

const options = [
    {value: 12, label: '12'},
    {value: 24, label: '24'},
    {value: 48, label: '48'},
    {value: 96, label: '96'}
];

const Finder = ({readAllProjectMoodBoardAction, filter, changeFilter}) => {
    const params = useParams();

    return (
        <div
            className={`d-flex flex-wrap ${readAllProjectMoodBoardAction.data?.data?.pagination?.total > filter.per_page ? "justify-content-center justify-content-sm-between" : "justify-content-start"} align-items-center w-100 gap-5`}>
            <div className="w-125px">
                <SelectBox
                    id='pageSize'
                    name='pageSize'
                    value={filter.per_page}
                    options={options}
                    onChange={(value) => {
                        changeFilter({per_page: value});
                        readAllProjectMoodBoardAction.mutate({
                            ...filter,
                            per_page: value,
                            project_id: params.id
                        });
                    }}
                />
            </div>

            {
                readAllProjectMoodBoardAction.data?.data?.pagination?.total > filter.per_page && (
                    <Pagination
                        current={filter.page}
                        pageSize={filter.per_page}
                        total={readAllProjectMoodBoardAction.data?.data?.pagination?.total}
                        onChange={(value) => {
                            changeFilter({page: value});
                            readAllProjectMoodBoardAction.mutate({
                                ...filter,
                                page: value,
                                project_id: params.id
                            });
                        }}
                    />
                )
            }
        </div>
    )
}

export default Finder;