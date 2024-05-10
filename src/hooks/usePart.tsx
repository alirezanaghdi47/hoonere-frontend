// libraries
import {useState} from "react";

const usePart = (initialData = null, activePart = null) => {
    const [part, setPart] = useState(initialData);
    const [currentPart, setCurrentPart] = useState(activePart);

    const changePart = (value) => setPart(value);

    const changeCurrentPart = (value) => setCurrentPart(value);

    const resetPart = () => {
        setPart(initialData);
        setCurrentPart(activePart);
    }

    return {part, changePart, resetPart, currentPart, changeCurrentPart}
}

export default usePart;