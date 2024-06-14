// libraries
import {useState} from "react";

const useFilter = <T,>(initialData = null) => {
    const [filter, setFilter] = useState<T>(initialData);
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

    const initialFilter = initialData;

    const changeFilter = (value: { [key: string]: string | number | null }) => setFilter(prevState => ({...prevState, ...value}));

    const resetFilter = () => setFilter(initialData);

    const showFilter = () => setIsOpenFilter(true);

    const hideFilter = () => setIsOpenFilter(false);

    const toggleFilter = () => setIsOpenFilter(prev => !prev);

    return {filter, initialFilter, changeFilter, resetFilter, isOpenFilter, showFilter, hideFilter, toggleFilter}
}

export default useFilter;