// libraries
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

const useId = (initialData = null) => {
    const [uuid, setUuid] = useState(initialData);

    const regenerateUUID = () => setUuid(uuidv4());

    useEffect(() => {
        setUuid(uuidv4());
    }, []);

    return {uuid, regenerateUUID}
}

export default useId;