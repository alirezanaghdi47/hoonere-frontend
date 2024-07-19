// libraries
import {useState} from "react";
import {useParams} from "react-router-dom";

// components
import DataModal from "@/components/widgets/panel/projects/read/mood-boards/read/DataModal.tsx";

const Content = () => {
    const params = useParams();
    const [data, setData] = useState({});

    return (
        <DataModal moodBoard={data}/>
    )
}

export default Content;