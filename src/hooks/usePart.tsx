// libraries
import {useState} from "react";

const usePart = (initialData = null, activePart = null) => {
    const [part, setPart] = useState<unknown>(initialData);
    const [currentPart, setCurrentPart] = useState<string | number>(activePart);

    const changePart = (value: unknown) => setPart(value);

    const changeCurrentPart = (value: string | number) => setCurrentPart(value);

    const resetPart = () => {
        setPart(initialData);
        setCurrentPart(activePart);
    }

    return {part, changePart, resetPart, currentPart, changeCurrentPart}
}

export default usePart;