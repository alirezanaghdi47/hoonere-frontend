// libraries
import {useState} from "react";

const useFilter = (initialData = null) => {
    const [filter, setFilter] = useState(initialData);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const initialFilter = initialData;

    const changeFilter = (value) => setFilter(prevState => ({...prevState, ...value}));

    const resetFilter = () => setFilter(initialData);

    const showFilter = () => setIsOpenFilter(true);

    const hideFilter = () => setIsOpenFilter(false);

    const toggleFilter = () => setIsOpenFilter(prev => !prev);

    return {filter, initialFilter, changeFilter, resetFilter, isOpenFilter, showFilter, hideFilter, toggleFilter}
}

export default useFilter;