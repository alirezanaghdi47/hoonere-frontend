// components
import Information from "@/components/widgets/panel/profile/Information.tsx";
import Links from "@/components/widgets/panel/profile/Links.tsx";
import Loading from "@/components/partials/panel/Loading.tsx";

const Summary = ({myProfileAction}) => {
    return !myProfileAction.isPending ? (
        <div className="card w-100">
            <div className="card-body pb-0">
                <Information myProfileAction={myProfileAction}/>
                <Links/>
            </div>
        </div>
    ) : (
        <Loading
            width="100%"
            height={250}
        />
    )
}

export default Summary;