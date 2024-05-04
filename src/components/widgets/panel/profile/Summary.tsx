// components
import Information from "@/components/widgets/panel/profile/Information.tsx";
import Links from "@/components/widgets/panel/profile/Links.tsx";

const Summary = ({me}) => {
    return (
        <div className="card w-100">
            <div className="card-body pb-0">
                <Information me={me}/>

                <Links/>
            </div>
        </div>
    )
}

export default Summary;