// components
import Information from "@/components/widgets/account/profile/Information.tsx";
import Links from "@/components/widgets/account/profile/Links.tsx";

const Summary = () => {
    return (
        <div className="card w-100">
            <div className="card-body pb-0">
                <Information/>

                <Links/>
            </div>
        </div>
    )
}

export default Summary;