// components
import Legal from "@/components/widgets/panel/profile/review/Legal.tsx";
import Real from "@/components/widgets/panel/profile/review/Real.tsx";

const Review = ({readMyProfileAction}) => {
    return (
        <>
            {
                readMyProfileAction.data?.data?.user_info?.user_type === "1" && (
                    <Real readMyProfileAction={readMyProfileAction}/>
                )
            }

            {
                readMyProfileAction.data?.data?.user_info?.user_type === "2" && (
                    <Legal readMyProfileAction={readMyProfileAction}/>
                )
            }
        </>
    )
}

export default Review;