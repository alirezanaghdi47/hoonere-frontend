// modules
import SelectBox from "@/modules/SelectBox.tsx";
import Pagination from "@/modules/Pagination.tsx";

const TableNavigator = () => {
    const options = [
        {value: '12', label: '12'},
        {value: '24', label: '24'},
        {value: '48', label: '48'},
        {value: '96', label: '96'}
    ];

    return (
        <div className="d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center w-100 gap-5">
            <div className="w-100px">
                <SelectBox
                    name='pageSize'
                    value={options[1]}
                    options={options}
                    onChange={(value) => console.log(value)}
                />
            </div>

            <Pagination
                current={1}
                pageSize={2}
                total={20}
                onChange={(value) => console.log(value)}
            />
        </div>
    )
}

export default TableNavigator;