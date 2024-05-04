// libraries
import {useState} from "react";

const useFilter = (initialData = null) => {
    const [filter, setFilter] = useState(initialData);
    const [isOpenFilter , setIsOpenFilter] = useState(false);

    const changeFilter = ({key, value}) => setFilter(prevState => ({...prevState, [key]: value}));

    const resetFilter = () => setFilter(initialData);

    const showFilter = () => setIsOpenFilter(true);

    const hideFilter = () => setIsOpenFilter(true);

    return {filter, changeFilter , resetFilter, isOpenFilter, showFilter, hideFilter}
}

export default useFilter;